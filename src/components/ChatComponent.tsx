// src/components/ChatComponent.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { db } from "../firebase/firebaseConfig";
import { Send } from "lucide-react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

// --- MOCK DATA (Must match MessagePage.tsx) ---
const MOCK_USER_DATABASE: Record<string, { name: string; role: string }> = {
  "admin-uid-123": { name: "Dr. Milan Sharma (Admin)", role: "admin" },
  "student-uid-987": { name: "Aarav Singh (Student)", role: "student" },
  "student-uid-654": { name: "Priya Patel (Student)", role: "student" },
  "faculty-milan": { name: "Dr. Milan Sharma", role: "faculty" },
  "faculty-anya": { name: "Dr. Anya Smith", role: "faculty" },
  "faculty-john": { name: "Prof. John Doe", role: "faculty" },
  "faculty-jane": { name: "Dr. Jane Wilson", role: "faculty" },
};

// 🔑 UPDATED HELPER: Uses the current user's context to determine the role
const getUserRole = (
  userId: string,
  currentUserId: string,
  currentUserRole: string
): string => {
  // 1. Check Mock Database first
  if (MOCK_USER_DATABASE[userId]?.role) {
    return MOCK_USER_DATABASE[userId].role;
  }

  // 2. If the queried ID is the CURRENTLY logged-in user
  if (userId === currentUserId) {
    // Use the role determined by AuthContext (which should be 'student' for a new student)
    return currentUserRole || "student";
  }

  // 3. Fallback for any other unknown ID (shouldn't happen with canonical IDs)
  return "unknown";
};

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: Date;
}

// 🔑 UPDATED PROPS
interface ChatProps {
  chatRoomId: string;
  currentUserId: string;
  currentUserName: string;
  currentUserRole: string; // <-- NEW PROP
}

const ChatComponent: React.FC<ChatProps> = ({
  chatRoomId,
  currentUserId,
  currentUserName,
  currentUserRole, // <-- DESTRUCTURE NEW PROP
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. CHAT ROOM INITIALIZATION & REAL-TIME LISTENER
  useEffect(() => {
    setIsLoading(true);

    const messagesRef = collection(db, "chats", chatRoomId, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const msgs: ChatMessage[] = [];
        snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          const timestamp =
            data.timestamp instanceof Timestamp
              ? data.timestamp.toDate()
              : new Date();

          msgs.push({
            id: doc.id,
            senderId: data.senderId as string,
            senderName: data.senderName as string,
            message: data.message as string,
            timestamp: timestamp,
          });
        });
        setMessages(msgs);
        setIsLoading(false);
      },
      (error) => {
        console.error("Firestore real-time error:", error);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, [chatRoomId]);

  // 2. Auto-scroll
  useEffect(() => {
    if (!isLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // 3. SEND MESSAGE HANDLER (Chat Creation Logic)
  const sendMessage = useCallback(async () => {
    if (inputMessage.trim() === "") return;

    try {
      const chatRef = doc(db, "chats", chatRoomId);
      const chatSnap = await getDoc(chatRef);

      // FIX: If chat document doesn't exist, create it FIRST.
      if (!chatSnap.exists()) {
        const memberIds = chatRoomId.split("--");
        if (memberIds.length !== 2) {
          throw new Error("Invalid chatRoomId format.");
        }
        const [id1, id2] = memberIds;

        // Determine the two users' roles using the updated helper
        const role1 = getUserRole(id1, currentUserId, currentUserRole);
        const role2 = getUserRole(id2, currentUserId, currentUserRole);

        let chatType = "direct";

        // Logic to determine 'support' chat (Student <-> Admin/Faculty)
        const isFacultyOrAdmin = (role: string) =>
          role === "admin" || role === "faculty";
        const isStudent = (role: string) => role === "student";

        if (
          (isFacultyOrAdmin(role1) && isStudent(role2)) ||
          (isStudent(role1) && isFacultyOrAdmin(role2))
        ) {
          chatType = "support";
        }

        // Initialize the chat room document (required by security rules for create)
        await setDoc(chatRef, {
          createdAt: serverTimestamp(),
          members: {
            [id1]: true,
            [id2]: true,
          },
          chatType: chatType,
        });
      }

      // Add the message to the subcollection
      const messagesRef = collection(db, "chats", chatRoomId, "messages");
      await addDoc(messagesRef, {
        senderId: currentUserId,
        senderName: currentUserName,
        message: inputMessage,
        timestamp: serverTimestamp(),
      });

      setInputMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }, [
    inputMessage,
    currentUserId,
    currentUserName,
    chatRoomId,
    currentUserRole,
  ]); // <-- ADDED currentUserRole dependency

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        Loading chat history...
      </div>
    );
  }

  // 4. Render JSX
  return (
    <div className="flex flex-col h-full border rounded-lg shadow-xl bg-white dark:bg-gray-800 max-w-full mx-auto">
      {/* Message Display Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 pt-10">
            Start the conversation!
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === currentUserId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl shadow-md text-sm ${
                msg.senderId === currentUserId
                  ? "bg-indigo-500 text-white rounded-br-none"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none"
              }`}
            >
              <p
                className={`font-bold text-xs mb-1 ${
                  msg.senderId === currentUserId
                    ? "text-indigo-200"
                    : "text-indigo-600 dark:text-indigo-400"
                }`}
              >
                {msg.senderName}
              </p>
              <p>{msg.message}</p>
              <span
                className={`text-[10px] mt-1 block ${
                  msg.senderId === currentUserId
                    ? "text-indigo-200 opacity-80"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 dark:border-gray-700 rounded-l-lg leading-5 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow"
        />
        <button
          onClick={sendMessage}
          disabled={!inputMessage.trim()}
          className="px-4 flex items-center justify-center bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 disabled:bg-indigo-300 dark:disabled:bg-indigo-700/50 transition duration-150"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
