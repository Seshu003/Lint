import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signInWithGitHub: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth changes - this will handle initial state and all subsequent changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user || null);
        setLoading(false);
        
        // Handle session expiration
        if (event === 'TOKEN_REFRESHED' && !session) {
          // Session expired and couldn't be refreshed
          console.log('Session expired, user logged out');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
    if (error) throw error;
  };

  const signInWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    });
    if (error) throw error;
  };

  const signOut = async () => {
    try {
      // Clear local state immediately to prevent UI flickering
      setSession(null);
      setUser(null);
      
      // Attempt to sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        // Handle specific session-related errors gracefully
        if (error.message?.includes('Session from session_id claim in JWT does not exist') ||
            error.message?.includes('session_not_found') ||
            error.message?.includes('Auth session missing')) {
          // Session already expired/invalid on server, local state already cleared
          console.log('Session already expired on server, local state cleared');
          return;
        }
        // For other errors, we still keep local state cleared but log the error
        console.error('Sign out error:', error);
      }
    } catch (error: any) {
      // Handle network errors or other unexpected issues
      if (error.message?.includes('Session from session_id claim in JWT does not exist') ||
          error.message?.includes('session_not_found') ||
          error.message?.includes('Auth session missing')) {
        // Session already expired/invalid, local state already cleared
        console.log('Session already expired, local state cleared');
        return;
      }
      console.error('Sign out error:', error);
    }
  };

  const value = {
    session,
    user,
    loading,
    signInWithGitHub,
    signInWithEmail,
    signUpWithEmail,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};