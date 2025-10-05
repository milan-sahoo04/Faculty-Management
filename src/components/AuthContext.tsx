// src/components/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  signInWithPopup,
  signOut,
  User,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

// 💡 Ensure this path and exports (auth, googleProvider, db) are correct
import { auth, googleProvider, db } from "../firebase/firebaseConfig";

// --- Types ---
type UserRole = "admin" | "student" | null;

// Extend the User type to include the role
interface AuthUser extends User {
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  role: UserRole;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

// --- Context and Hook ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// --- Helper function to fetch/set user details in Firestore ---
/**
 * Checks Firestore for the user's role. Creates a new document with 'student' role if none exists.
 * @param user The Firebase User object.
 * @returns The determined UserRole.
 */
const fetchAndSetUserRole = async (user: User): Promise<UserRole> => {
  const userDocRef = doc(db, "users", user.uid);
  const userDoc = await getDoc(userDocRef);
  let userRole: UserRole = "student"; // 🚀 Default role is Student

  if (userDoc.exists()) {
    // User exists, retrieve the stored role
    const data = userDoc.data();
    // Use the stored role, or default to 'student' if the role field is missing/invalid
    userRole = (data.role as UserRole) || "student";
  } else {
    // 🚀 NEW USER: Create the document and assign default role 'student'
    console.log(
      "New user detected. Creating Firestore profile with role: student."
    );
    await setDoc(
      userDocRef,
      {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName, // Use displayName from Google for fullName
        role: userRole,
        createdAt: serverTimestamp(),
      },
      { merge: true } // Merge ensures we don't overwrite any other fields later
    );
  }
  return userRole;
};

// --- Provider Component ---
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  // 1. Google Login Function
  const loginWithGoogle = async () => {
    try {
      // 🚀 The sign-in process triggers the onAuthStateChanged listener below
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google Sign-In Failed:", error);
      throw error;
    }
  };

  // 2. Logout Function
  const logout = async () => {
    try {
      await signOut(auth);
      // The onAuthStateChanged listener handles setting currentUser to null and clearing the role
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  // 3. Auth State Listener (Handles login persistence and role fetching)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setCurrentUser(user);

      if (user) {
        // Fetch and set the user's role from Firestore for the currently logged-in user
        const role = await fetchAndSetUserRole(user);
        setUserRole(role);
      } else {
        // No user is logged in
        setUserRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Combine Firebase User and Firestore Role into one object
  const authUser: AuthUser | null = currentUser
    ? { ...currentUser, role: userRole }
    : null;

  const value: AuthContextType = {
    user: authUser,
    loading,
    role: userRole,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
