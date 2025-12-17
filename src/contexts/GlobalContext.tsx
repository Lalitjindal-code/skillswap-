import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Skill {
  name: string;
  verified: boolean;
  rating: number;
  hash: string;
}

interface User {
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
  updateCoins: (amount: number) => void;
  addSkill: (skill: string, type: 'teach' | 'learn') => void;
  verifySkill: (skillName: string) => void;
  markNotificationRead: (id: string) => void;
  verifyOtp: (email: string, token: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => void;
}

const defaultUser: User = {
  name: '',
  email: '',
  avatar: '',
  coins: 3, // Default starting coins
  level: 0,
  levelTitle: 'Novice',
  verifiedSkills: [],
  learningSkills: [],
  isLoggedIn: false,
  isPro: false,
  hasCompletedOnboarding: false,
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

  // Sync Auth State
  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchProfile(session.user.id, session.user.email, session.user.user_metadata?.name);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        fetchProfile(session.user.id, session.user.email, session.user.user_metadata?.name);
      } else {
        setUser(defaultUser);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string, email?: string, metadataName?: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (data) {
        setUser(prev => ({
          ...prev,
          id: userId,
          isLoggedIn: true,
          email: data.email || email || '',
          name: data.name || metadataName || email?.split('@')[0] || 'User',
          avatar: data.avatar_text || `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
          coins: data.coins || 3,
          level: data.level || 0,
          hasCompletedOnboarding: data.has_completed_onboarding || false,
        }));
      } else if (email) {
        // Fallback if profile trigger failed or slow
        console.log("GlobalContext: Using fallback profile, forcing onboarding=false");
        setUser(prev => ({
          ...prev,
          id: userId,
          isLoggedIn: true,
          email: email,
          name: metadataName || email.split('@')[0],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
          hasCompletedOnboarding: false, // Explicitly force this
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
    // Toast handled in UI
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

  const updateCoins = (amount: number) => {
    setUser(prev => ({
      ...prev,
      coins: prev.coins + amount,
    }));
    // TODO: Sync to DB
    if (user.id) {
      // Fire and forget update
      const newBalance = user.coins + amount;
      supabase.from('profiles').update({ coins: newBalance }).eq('id', user.id).then();
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

  const updateProfile = (data: Partial<User>) => {
    setUser(prev => ({ ...prev, ...data }));
    if (user.id) {
      // Fire and forget update to DB if fields map 1:1, otherwise just local for demo
      supabase.from('profiles').update(data).eq('id', user.id).then();
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
