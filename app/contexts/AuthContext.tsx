import {
  EmailAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../config/firebaseConfig';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: {
    displayName?: string;
    photoURL?: string;
  }) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
    } catch (error) {
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    // try {
    //   const provider = new GoogleAuthProvider();
    //   const result = await signInWithPopup(auth, provider);
    //   setUser(result.user);
    // } catch (error) {
    //   throw error;
    // }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(result.user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const updateUserProfile = async (data: {
    displayName?: string;
    photoURL?: string;
  }) => {
    try {
      if (!auth.currentUser) {
        throw new Error('Usuário não autenticado');
      }
      await updateProfile(auth.currentUser, data);
      // Atualiza o estado do usuário
      setUser({ ...auth.currentUser, ...data } as User);
    } catch (error) {
      throw error;
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser || !currentUser.email) {
        throw new Error('Usuário não autenticado');
      }

      // Reautenticar o usuário
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(currentUser, credential);

      // Atualizar a senha
      await updatePassword(currentUser, newPassword);
    } catch (error: any) {
      if (error.code === 'auth/wrong-password') {
        throw new Error('Senha atual incorreta');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('A nova senha é muito fraca');
      }
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signInWithGoogle,
        signUp,
        logout,
        updateUserProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
