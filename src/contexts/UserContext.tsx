import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  major: string;
  semester: string;
  university: string;
  studentId: string;
  xp: number;
  streak: number;
  level: number;
  completedLessons: string[];
  selectedSubjects: string[];
  lastActiveDate: string;
}

interface UserContextType {
  user: User | null;
  login: (userData: Partial<User>) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addXP: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  updateStreak: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('medingo_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    // Save user to localStorage whenever user changes
    if (user) {
      localStorage.setItem('medingo_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('medingo_user');
    }
  }, [user]);

  const login = (userData: Partial<User>) => {
    const newUser: User = {
      id: Date.now().toString(),
      username: userData.username || '',
      email: userData.email || '',
      major: userData.major || '',
      semester: userData.semester || '',
      university: userData.university || '',
      studentId: userData.studentId || '',
      xp: 0,
      streak: 0,
      level: 1,
      completedLessons: [],
      selectedSubjects: [],
      lastActiveDate: new Date().toISOString().split('T')[0],
      ...userData,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...updates });
  };

  const addXP = (amount: number) => {
    if (!user) return;
    const newXP = user.xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1; // Level up every 100 XP
    
    const updatedUser = {
      ...user,
      xp: newXP,
      level: newLevel,
    };
    setUser(updatedUser);
  };

  const completeLesson = (lessonId: string) => {
    if (!user) return;
    if (user.completedLessons.includes(lessonId)) return;
    
    const updatedUser = {
      ...user,
      completedLessons: [...user.completedLessons, lessonId],
    };
    setUser(updatedUser);
  };

  const updateStreak = () => {
    if (!user) return;
    
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    if (user.lastActiveDate === yesterday) {
      // Continue streak
      setUser({
        ...user,
        streak: user.streak + 1,
        lastActiveDate: today,
      });
    } else if (user.lastActiveDate !== today) {
      // Reset streak if more than 1 day gap
      setUser({
        ...user,
        streak: 1,
        lastActiveDate: today,
      });
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
        addXP,
        completeLesson,
        updateStreak,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};