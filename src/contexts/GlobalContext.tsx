import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Skill {
  name: string;
  verified: boolean;
  rating: number;
  hash: string;
}

interface User {
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
  login: (email: string, password: string) => void;
  updateCoins: (amount: number) => void;
  addSkill: (skill: string, type: 'teach' | 'learn') => void;
  verifySkill: (skillName: string) => void;
  markNotificationRead: (id: string) => void;
}

const defaultUser: User = {
  name: '',
  email: '',
  avatar: '',
  coins: 0,
  level: 3,
  levelTitle: 'Apprentice',
  verifiedSkills: [],
  learningSkills: [],
  isLoggedIn: false,
  isPro: false,
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
  {
    id: '2',
    title: 'New Badge Earned!',
    message: 'You earned the React Verified badge',
    type: 'success',
    time: '1h ago',
    read: false,
  },
  {
    id: '3',
    title: 'Group Pool Funded',
    message: 'Machine Learning pool reached its goal',
    type: 'success',
    time: '3h ago',
    read: true,
  },
];

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);

  const login = (email: string, _password: string) => {
    setUser(prev => ({
      ...prev,
      email,
      name: email.split('@')[0],
      isLoggedIn: true,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
    }));
  };

  const updateCoins = (amount: number) => {
    setUser(prev => ({
      ...prev,
      coins: prev.coins + amount,
    }));
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

  return (
    <GlobalContext.Provider
      value={{
        user,
        notifications,
        setUser,
        login,
        updateCoins,
        addSkill,
        verifySkill,
        markNotificationRead,
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
