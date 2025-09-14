import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'technician' | 'viewer';
}

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthState = useCallback(async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (err) {
      console.log('Error checking auth state:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthState();
  }, [checkAuthState]);

  const signIn = useCallback(async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!email.trim() || email.length > 100) return { success: false, error: 'Invalid email' };
      if (!password.trim() || password.length > 100) return { success: false, error: 'Invalid password' };
      
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would be an API call
      if (email && password.length >= 6) {
        const mockUser: User = {
          id: '1',
          email: email.trim(),
          name: email.split('@')[0],
          role: 'technician',
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (err) {
      return { success: false, error: 'Sign in failed' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!email.trim() || email.length > 100) return { success: false, error: 'Invalid email' };
      if (!password.trim() || password.length > 100) return { success: false, error: 'Invalid password' };
      if (!name.trim() || name.length > 100) return { success: false, error: 'Invalid name' };
      
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email && password.length >= 6 && name) {
        const mockUser: User = {
          id: '1',
          email: email.trim(),
          name: name.trim(),
          role: 'technician',
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        return { success: true };
      } else {
        return { success: false, error: 'Please fill all fields correctly' };
      }
    } catch (err) {
      return { success: false, error: 'Sign up failed' };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (err) {
      console.log('Error signing out:', err);
    }
  }, []);

  return useMemo(() => ({
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  }), [user, isLoading, signIn, signUp, signOut]);
});