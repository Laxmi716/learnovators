import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from 'firebase/firestore';
import { auth, db, googleProvider, isFirebaseConfigured } from '../firebase';

const AuthContext = createContext(null);

const STORAGE_USERS_KEY = 'learnovators_users';
const STORAGE_SESSION_KEY = 'learnovators_session_user';

function getInitialUserTemplate(uid, email, name, educationLevel = '', college = '') {
  return {
    id: uid,
    uid,
    name: name || '',
    email,
    educationLevel: educationLevel || '',
    college: college || '',
    onboardingStep: 0,
    enrolled: false,
    coins: 0,
    interestAnswers: [],
    interestScores: { analytical: 0, creative: 0, social: 0, technical: 0 },
    academicProfile: { marks: '', stream: '', certifications: '', examScore: '' },
    mindsetAnswers: [],
    mindsetScores: { resilience: 0, confidence: 0, focus: 0 },
    weeklyQuizCompleted: false,
    wellbeingTasks: { task1: false, task2: false, task3: false },
    redemptions: { library: false, ebook: false, mentorship: false },
    createdAt: new Date().toISOString(),
  };
}

function applyNestedUpdate(targetObj, updateData) {
  const updated = JSON.parse(JSON.stringify(targetObj));
  for (const [key, value] of Object.entries(updateData)) {
    if (key.includes('.')) {
      const parts = key.split('.');
      let current = updated;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = value;
    } else {
      updated[key] = value;
    }
  }
  return updated;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  // -------------------------------------------------------------
  // FIREBASE INITIALIZATION & SYNC
  // -------------------------------------------------------------
  async function createFirestoreUserDoc(user, extra = {}) {
    if (!db) return;
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      const initialDoc = getInitialUserTemplate(
        user.uid,
        user.email,
        user.displayName || extra.name,
        extra.educationLevel,
        extra.college
      );
      await setDoc(ref, initialDoc);
    }
  }

  // Firebase auth listener
  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      // Local storage fallback mode
      try {
        const savedSession = localStorage.getItem(STORAGE_SESSION_KEY);
        if (savedSession) {
          const sessionUser = JSON.parse(savedSession);
          setCurrentUser(sessionUser);
          const allUsers = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '{}');
          const docData = allUsers[sessionUser.uid] || sessionUser;
          setUserDoc(docData);
        }
      } catch (err) {
        console.warn('Error reading local storage session:', err);
      } finally {
        setLoading(false);
      }
      return;
    }

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (!user) {
        setUserDoc(null);
        setLoading(false);
      }
    });
    return unsubAuth;
  }, []);

  // Firebase firestore sync
  useEffect(() => {
    if (!isFirebaseConfigured || !db || !currentUser) return;
    const ref = doc(db, 'users', currentUser.uid);
    const unsubDoc = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setUserDoc({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    });
    return unsubDoc;
  }, [currentUser]);

  // -------------------------------------------------------------
  // AUTH METHODS
  // -------------------------------------------------------------
  async function signup(email, password, name, educationLevel, college) {
    if (isFirebaseConfigured && auth) {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      await createFirestoreUserDoc(result.user, { name, educationLevel, college });
      return result;
    }

    // Local storage mode
    const allUsers = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '{}');
    const existing = Object.values(allUsers).find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      const err = new Error('Email already in use');
      err.code = 'auth/email-already-in-use';
      throw err;
    }

    const uid = 'local_user_' + Date.now();
    const newUser = {
      uid,
      email,
      displayName: name,
      password, // Stored locally only for mock session
    };

    const newDoc = getInitialUserTemplate(uid, email, name, educationLevel, college);
    allUsers[uid] = { ...newDoc, password };
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(allUsers));
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(newUser));

    setCurrentUser(newUser);
    setUserDoc(newDoc);
    return { user: newUser };
  }

  async function login(email, password) {
    if (isFirebaseConfigured && auth) {
      return signInWithEmailAndPassword(auth, email, password);
    }

    // Local storage mode
    const allUsers = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '{}');
    const user = Object.values(allUsers).find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      const err = new Error('Invalid email or password');
      err.code = 'auth/invalid-credential';
      throw err;
    }

    const sessionUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.name,
    };

    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionUser));
    setCurrentUser(sessionUser);
    setUserDoc(user);
    return { user: sessionUser };
  }

  async function loginWithGoogle() {
    if (isFirebaseConfigured && auth && googleProvider) {
      const result = await signInWithPopup(auth, googleProvider);
      await createFirestoreUserDoc(result.user);
      return result;
    }

    // Local demo Google login simulation
    const uid = 'google_demo_user';
    const email = 'alex.rivera@student.edu';
    const name = 'Alex Rivera';

    const sessionUser = { uid, email, displayName: name };
    const allUsers = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '{}');

    if (!allUsers[uid]) {
      allUsers[uid] = getInitialUserTemplate(uid, email, name, 'Undergraduate (UG)', 'National Tech Institute');
    }

    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(allUsers));
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(sessionUser));

    setCurrentUser(sessionUser);
    setUserDoc(allUsers[uid]);
    return { user: sessionUser };
  }

  async function logout() {
    if (isFirebaseConfigured && auth) {
      return signOut(auth);
    }

    localStorage.removeItem(STORAGE_SESSION_KEY);
    setCurrentUser(null);
    setUserDoc(null);
  }

  async function updateUserDoc(data) {
    if (!currentUser) return;

    if (isFirebaseConfigured && db) {
      const ref = doc(db, 'users', currentUser.uid);
      await updateDoc(ref, data);
      return;
    }

    // Local storage update with nested dot notation support
    const allUsers = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY) || '{}');
    const existing = allUsers[currentUser.uid] || userDoc || getInitialUserTemplate(currentUser.uid, currentUser.email, currentUser.displayName);
    const updated = applyNestedUpdate(existing, data);

    allUsers[currentUser.uid] = updated;
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(allUsers));
    setUserDoc(updated);
  }

  const value = {
    currentUser,
    userDoc,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    updateUserDoc,
    isFirebaseConfigured,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
