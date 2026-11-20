// MunimJi by Cool Art® - Firebase Configuration & Shared Helpers
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC-O_qe4Zn3Vh9ZVbRU45AWb_GJVj-nd2A",
  authDomain: "munimji-6b631.firebaseapp.com",
  projectId: "munimji-6b631",
  storageBucket: "munimji-6b631.firebasestorage.app",
  messagingSenderId: "159323529120",
  appId: "1:159323529120:web:4cfe34a22424d9bd2c0ec5",
  measurementId: "G-SEMS638CWZ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Super Admin Email
export const SUPER_ADMIN_EMAIL = "krishankantbhardwaj1993@gmail.com";

// नया यूज़र आने पर 7 दिन का फ्री डेमो और प्रोफाइल बनाना
export async function ensureUserProfile(user, extraData = {}) {
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);
  const now = new Date();
  const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  if (!snap.exists()) {
    const profileData = {
      uid: user.uid,
      email: user.email || "",
      displayName: extraData.displayName || user.displayName || "MunimJi User",
      phone: extraData.phone || "",
      businessType: extraData.businessType || "general",
      role: (user.email || "").toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase() ? "admin" : "user",
      planStatus: "trial",
      planName: "7-Day Free Demo",
      trialEndsAt: trialEnd.toISOString(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    await setDoc(userRef, profileData);
    return profileData;
  }

  return snap.data();
}

export {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
};