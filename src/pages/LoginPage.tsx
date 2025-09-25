// src/pages/LoginPage.tsx
import React, { useState, useEffect } from "react";
import {
  Target,
  Mail,
  Lock,
  CircleCheck, // Make sure CircleCheck is imported for the welcome animation
  FlaskConical, // Assuming these are still used in the left section as per previous solution
  ClipboardList,
  Dna,
  BarChart2,
} from "lucide-react";
import { auth, db, googleProvider } from "../firebase/firebaseConfig";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import loginIllustration from "../assets/login.png"; // Your custom login image

interface LoginPageProps {
  onLogin: () => void;
}

/* Firebase error → friendly text */
const friendlyFirebaseMessage = (err: any): string => {
  const code = err?.code as string | undefined;
  switch (code) {
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/user-disabled":
      return "This user has been disabled.";
    case "auth/user-not-found":
      return "No account found with this email. Please sign up.";
    case "auth/wrong-password":
      return "Incorrect password. Try again or reset your password.";
    case "auth/email-already-in-use":
      return "Email already in use. Try signing in or reset your password.";
    case "auth/weak-password":
      return "Password is too weak. Use at least 6 characters.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled in Firebase console.";
    case "auth/credential-already-in-use":
      return "This phone/email is already linked to another account.";
    default:
      return err?.message || "Authentication failed. Please try again.";
  }
};

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Signup: phone & otp
  const [phone, setPhone] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  // Profile details
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");

  // UI state
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [welcome, setWelcome] = useState(false);

  /* ---------- Google login ---------- */
  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google user:", result.user);
      setWelcome(true);
      setTimeout(onLogin, 1500); // Delay for welcome animation
    } catch (err) {
      console.error(err);
      setError(friendlyFirebaseMessage(err));
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Email login ---------- */
  const handleEmailSignIn = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in:", cred.user);
      setWelcome(true);
      setTimeout(onLogin, 1500); // Delay for welcome animation
    } catch (err) {
      console.error(err);
      setError(friendlyFirebaseMessage(err));
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Phone OTP (Only if isSignup is true) ---------- */
  const setupRecaptcha = () => {
    if ((window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier.clear(); // Clear existing if any
      (window as any).recaptchaVerifier = null;
    }
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      { size: "invisible" }
    );
  };

  const sendOtpToPhone = async () => {
    setError(null);
    if (!phone) {
      setError("Enter phone in +91 format, e.g. +919876543210");
      return;
    }
    setLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = (window as any).recaptchaVerifier;
      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );
      setConfirmationResult(confirmation);
      setOtpSent(true);
      alert("OTP sent to " + phone);
    } catch (err) {
      console.error("sendOtp error:", err);
      setError(friendlyFirebaseMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError(null);
    if (!confirmationResult) {
      setError("Click 'Send OTP' first.");
      return;
    }
    if (!otp) {
      setError("Enter OTP.");
      return;
    }
    setLoading(true);
    try {
      const userCred = await confirmationResult.confirm(otp);
      console.log("Phone verified:", userCred.user);
      setPhoneVerified(true);
      alert("Phone verified. Now complete your profile.");
    } catch (err) {
      console.error("verifyOtp error:", err);
      setError(friendlyFirebaseMessage(err));
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Finish Registration (Only if isSignup is true) ---------- */
  const finishRegistration = async () => {
    setError(null);
    if (!phoneVerified) {
      setError("Verify phone first.");
      return;
    }
    if (!email || !password) {
      setError("Enter email & password.");
      return;
    }
    if (!fullName) {
      setError("Enter your full name.");
      return;
    }
    setLoading(true);
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) throw { message: "No current user." };

      const emailCredential = EmailAuthProvider.credential(email, password);
      await linkWithCredential(currentUser, emailCredential);

      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          uid: currentUser.uid,
          email,
          phone: currentUser.phoneNumber || phone,
          fullName,
          department: department || null,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      try {
        await sendEmailVerification(currentUser);
        alert("Verification email sent to " + email);
      } catch (e) {
        console.warn("sendEmailVerification failed", e);
      }

      setWelcome(true);
      setTimeout(onLogin, 1500); // Delay for welcome animation
    } catch (err) {
      console.error("finishRegistration error:", err);
      setError(friendlyFirebaseMessage(err));
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Forgot password ---------- */
  const handleForgotPassword = async () => {
    setError(null);
    if (!email) {
      setError("Enter email first.");
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Reset link sent to your email.");
    } catch (err) {
      console.error("reset error:", err);
      setError(friendlyFirebaseMessage(err));
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Optional welcome animation hide after 1.5s ---------- */
  useEffect(() => {
    if (welcome) {
      const timer = setTimeout(() => setWelcome(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [welcome]);

  /* ---------- UI ---------- */
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 overflow-hidden">
      <div id="recaptcha-container" />
      <div className="w-full max-w-md relative">
        <AnimatePresence mode="wait">
          {welcome ? (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-green-600 mb-2">
                🎉 Welcome!
              </h2>
              <p className="text-gray-600">Redirecting to dashboard...</p>
            </motion.div>
          ) : (
            <motion.div
              key={isSignup ? "signup" : "login"}
              initial={{ x: isSignup ? "100%" : "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isSignup ? "-100%" : "100%", opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              {/* Header */}
              <div className="text-center mb-8">
                {/* Image added here, above the main title */}
                <img
                  src={loginIllustration}
                  alt="Login illustration"
                  className="mx-auto mb-4 w-32 h-32 object-contain" // Adjust size as needed
                />
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Faculty Management
                </h1>
                <p className="text-gray-600 mt-2">
                  {isSignup
                    ? "Create your account (with phone OTP)"
                    : "Sign in to continue"}
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={(e) => {
                  if (!isSignup) handleEmailSignIn(e);
                  else e.preventDefault();
                }}
                className="space-y-4"
              >
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full pl-10 pr-4 py-3 border rounded-lg"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full pl-10 pr-4 py-3 border rounded-lg"
                      required
                    />
                  </div>
                </div>

                {/* Signup-only */}
                {isSignup && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+919876543210"
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={sendOtpToPhone}
                        disabled={loading || otpSent}
                        className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg"
                      >
                        {otpSent ? "OTP Sent" : "Send OTP"}
                      </button>
                      {otpSent && (
                        <>
                          <input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="w-36 px-3 py-2 border rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={verifyOtp}
                            disabled={loading}
                            className="bg-green-600 text-white px-3 py-2 rounded-lg"
                          >
                            Verify OTP
                          </button>
                        </>
                      )}
                    </div>

                    {phoneVerified && (
                      <div className="mt-4 border-t pt-4">
                        <h3 className="text-sm font-semibold mb-2">
                          Profile Details
                        </h3>
                        <input
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Full Name"
                          className="w-full px-3 py-2 border rounded-lg mb-2"
                        />
                        <input
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          placeholder="Department (optional)"
                          className="w-full px-3 py-2 border rounded-lg mb-2"
                        />
                        <button
                          type="button"
                          onClick={finishRegistration}
                          disabled={loading}
                          className="w-full bg-blue-600 text-white px-3 py-2 rounded-lg"
                        >
                          {loading ? "Finalizing..." : "Complete Registration"}
                        </button>
                      </div>
                    )}
                  </>
                )}

                {!isSignup && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg"
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </button>
                )}
              </form>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full mt-4 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span>
                  {loading ? "Signing in..." : "Continue with Google"}
                </span>
              </button>

              {/* Links */}
              <div className="mt-6 flex justify-between text-sm">
                <button
                  onClick={handleForgotPassword}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Forgot password?
                </button>
                <button
                  onClick={() => {
                    setIsSignup((s) => !s);
                    setError(null);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {isSignup ? "Back to Sign In" : "Create account"}
                </button>
              </div>

              {error && (
                <p className="mt-4 text-center text-red-500 text-sm">{error}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <p className="text-sm text-gray-500 text-center mt-6">
          © 2025 Faculty Management System
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
