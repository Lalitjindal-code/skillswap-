import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

import { mockDb, MockUser } from '@/services/mockDb';

interface Skill {
  name: string;
  verified: boolean;
  rating: number;
  hash: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  coins: number;
  level: number;
  levelTitle: string;
  verifiedSkills: Skill[];
  learningSkills: string[];
  isLoggedIn: boolean;
  isPro: boolean;
  hasCompletedOnboarding: boolean;
  streak: number;
  lastLoginDate: string;
  lastSpinDate: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  time: string;
  read: boolean;
}

interface GlobalContextType {
  user: User;
  notifications: Notification[];
  setUser: React.Dispatch<React.SetStateAction<User>>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateCoins: (amount: number) => Promise<void>;
  addSkill: (skill: string, type: 'teach' | 'learn') => void;
  verifySkill: (skillName: string) => void;
  markNotificationRead: (id: string) => void;
  verifyOtp: (email: string, token: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  checkStreak: () => void;
}

const defaultUser: User = {
  name: '',
  email: '',
  avatar: '',
  coins: 0,
  level: 0,
  levelTitle: 'Novice',
  verifiedSkills: [],
  learningSkills: [],
  isLoggedIn: false,
  isPro: false,
  hasCompletedOnboarding: false,
  streak: 0,
  lastLoginDate: '',
  lastSpinDate: '',
};

const defaultNotifications: Notification[] = [
  {
    id: '1',
    title: 'Session Starting Soon',
    message: 'Physics with Amit starts in 10 minutes',
    type: 'info',
    time: '2m ago',
    read: false,
  },
];

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);

  // Sync Auth State & Load from MockDb
  useEffect(() => {
    // Check localStorage first for simpler persistence in this demo
    const localUser = mockDb.getUser();

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchProfile(session.user.id, session.user.email, session.user.user_metadata?.name, localUser);
      } else if (localUser && localUser.lastLoginDate) {
        // If no supabase session but valid mockDb user (mocking persistent login for demo)
        // In a real app we'd rely solely on Supabase, but here we merge.
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchProfile(session.user.id, session.user.email, session.user.user_metadata?.name, mockDb.getUser());
      } else {
        // Don't fully reset if we want to keep some local demo state, 
        // but typically we should. For this requirement, we persist data.
        setUser(defaultUser);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string, email?: string, metadataName?: string, localUser?: MockUser | null) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        // Merge Supabase data with MockDb data (localUser wins for new fields)
        setUser(prev => ({
          ...prev,
          id: userId,
          isLoggedIn: true,
          email: data.email || email || '',
          name: data.name || metadataName || email?.split('@')[0] || 'User',
          avatar: data.avatar_text || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
          coins: localUser?.coins ?? (data.has_completed_onboarding ? (data.coins ?? 0) : 0), // Prefer local for demo continuity
          level: data.level || 0,
          hasCompletedOnboarding: data.has_completed_onboarding || false,
          streak: localUser?.streak || 0,
          lastLoginDate: localUser?.lastLoginDate || '',
          lastSpinDate: localUser?.lastSpinDate || '',
        }));
      } else if (email) {
        // Fallback / Demo Mode
        setUser(prev => ({
          ...prev,
          id: userId,
          isLoggedIn: true,
          email: email,
          name: metadataName || email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          hasCompletedOnboarding: false,
          coins: localUser?.coins ?? 0,
          streak: localUser?.streak || 0,
          lastLoginDate: localUser?.lastLoginDate || '',
          lastSpinDate: localUser?.lastSpinDate || '',
        }));
      }
    } catch (e) {
      console.error("Error fetching profile:", e);
    }
  };

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const signup = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        }
      }
    });
    if (error) throw error;
  };

  const verifyOtp = async (email: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup',
    });
    if (error) throw error;
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      }
    });
    if (error) throw error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(defaultUser);
    toast.success('Logged out successfully');
  };

  const updateCoins = async (amount: number) => {
    setUser(prev => {
      const newBalance = prev.coins + amount;
      const updatedUser = { ...prev, coins: newBalance };

      // Sync to MockDb
      mockDb.saveUser({
        coins: newBalance,
        streak: updatedUser.streak,
        lastLoginDate: updatedUser.lastLoginDate,
        lastSpinDate: updatedUser.lastSpinDate
      });

      return updatedUser;
    });

    if (user.id) {
      // Fire and forget update to real DB
      const newBalance = user.coins + amount;
      await supabase.from('profiles').update({ coins: newBalance }).eq('id', user.id);
    }
  };

  const addSkill = (skill: string, type: 'teach' | 'learn') => {
    if (type === 'teach') {
      setUser(prev => ({
        ...prev,
        verifiedSkills: [...prev.verifiedSkills, {
          name: skill,
          verified: false,
          rating: 0,
          hash: `0x${Math.random().toString(16).slice(2, 10)}...`,
        }],
      }));
    } else {
      setUser(prev => ({
        ...prev,
        learningSkills: [...prev.learningSkills, skill],
      }));
    }
  };

  const verifySkill = (skillName: string) => {
    setUser(prev => ({
      ...prev,
      verifiedSkills: prev.verifiedSkills.map(skill =>
        skill.name === skillName ? { ...skill, verified: true, rating: 4.5 } : skill
      ),
    }));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const updateProfile = async (data: Partial<User>) => {
    setUser(prev => {
      const updated = { ...prev, ...data };
      mockDb.saveUser({
        coins: updated.coins,
        streak: updated.streak,
        lastLoginDate: updated.lastLoginDate,
        lastSpinDate: updated.lastSpinDate
      });
      return updated;
    });

    if (user.id) {
      await supabase.from('profiles').update(data).eq('id', user.id);
    }
  };

  const checkStreak = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const lastLogin = user.lastLoginDate;

    if (lastLogin !== today) {
      let newStreak = user.streak;
      if (lastLogin === yesterday) {
        newStreak += 1;
        toast.success(`🔥 Streak Increased! ${newStreak} Day Streak!`);
      } else {
        newStreak = 1;
        // Don't toast on first login or broken streak, just silent update
      }

      updateProfile({ lastLoginDate: today, streak: newStreak });
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        notifications,
        setUser,
        login,
        signup,
        loginWithGoogle,
        logout,
        updateCoins,
        addSkill,
        verifySkill,
        markNotificationRead,
        verifyOtp,
        updateProfile,
        checkStreak,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
