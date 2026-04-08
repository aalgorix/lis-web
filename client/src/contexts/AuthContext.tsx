import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  linkWithCredential,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { auth, isFirebaseEnabled } from '@/lib/firebase';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<any>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<any>;
  signInWithGoogle: () => Promise<any>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setPasswordForGoogleUser: (newPassword: string) => Promise<void>;
  updateUserPassword: (newPassword: string) => Promise<void>;
  checkIfPasswordExists: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isUiOnlyMode = import.meta.env.VITE_UI_ONLY === 'true' || !isFirebaseEnabled || !auth;

  const mockUser = {
    uid: 'ui-only-user',
    email: 'student@learners.international',
    displayName: 'LIS Demo User',
  } as User;

  // Sign in with email and password
  const signInWithEmail = async (email: string, password: string) => {
    if (isUiOnlyMode) {
      setCurrentUser(mockUser);
      return { user: mockUser };
    }
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign up with email and password
  const signUpWithEmail = async (email: string, password: string, displayName?: string) => {
    if (isUiOnlyMode) {
      const nextUser = { ...mockUser, displayName: displayName || mockUser.displayName } as User;
      setCurrentUser(nextUser);
      return { user: nextUser };
    }
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName && result.user) {
      await updateProfile(result.user, { displayName });
    }
    return result;
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    if (isUiOnlyMode) {
      setCurrentUser(mockUser);
      localStorage.removeItem('needsPasswordSetup');
      return { user: mockUser };
    }
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    
    // Check if this Google user needs to set a password
    if (result.user && result.user.email) {
      const signInMethods = await fetchSignInMethodsForEmail(auth, result.user.email);
      // If only Google sign-in method exists, prompt user to set password
      if (signInMethods.length === 1 && signInMethods[0] === 'google.com') {
        // Store flag in localStorage to prompt password setup
        localStorage.setItem('needsPasswordSetup', 'true');
      }
    }
    
    return result;
  };

  // Logout
  const logout = async () => {
    if (isUiOnlyMode) {
      setCurrentUser(null);
      return;
    }
    return signOut(auth);
  };

  // Reset password
  const resetPassword = async (email: string) => {
    if (isUiOnlyMode) return;
    return sendPasswordResetEmail(auth, email);
  };

  // Set password for Google-authenticated user
  const setPasswordForGoogleUser = async (newPassword: string) => {
    if (isUiOnlyMode) {
      localStorage.removeItem('needsPasswordSetup');
      return;
    }
    if (!currentUser || !currentUser.email) {
      throw new Error('No user logged in');
    }

    try {
      // Create email/password credential
      const credential = EmailAuthProvider.credential(currentUser.email, newPassword);
      
      // Link the credential to the current user
      await linkWithCredential(currentUser, credential);
      
      // Clear the flag
      localStorage.removeItem('needsPasswordSetup');
      
      return;
    } catch (error: any) {
      if (error.code === 'auth/provider-already-linked') {
        // Password already exists, update it instead
        await updatePassword(currentUser, newPassword);
        localStorage.removeItem('needsPasswordSetup');
      } else {
        throw error;
      }
    }
  };

  // Update existing password
  const updateUserPassword = async (newPassword: string) => {
    if (isUiOnlyMode) return;
    if (!currentUser) {
      throw new Error('No user logged in');
    }
    return updatePassword(currentUser, newPassword);
  };

  // Check if user has password authentication method
  const checkIfPasswordExists = async (email: string) => {
    if (isUiOnlyMode) return true;
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      return methods.includes('password');
    } catch {
      return false;
    }
  };

  // Listen to auth state changes
  useEffect(() => {
    if (isUiOnlyMode) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    logout,
    resetPassword,
    setPasswordForGoogleUser,
    updateUserPassword,
    checkIfPasswordExists,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
