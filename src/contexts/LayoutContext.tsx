"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Interface cho UserDto - match với API response
export interface UserDto {
  id: string;
  name: string;
  email: string;
  userName?: string;
}

// Interface cho Context
interface LayoutContextType {
  userDto: UserDto | null;
  logout: () => void;
}

// Tạo Context
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

// Provider Component
export function LayoutProvider({ children }: { children: ReactNode }) {
  const [userDto, setUserDto] = useState<UserDto | null>(() => {
    // Initialize from localStorage on first render (client-side only)
    if (typeof window !== 'undefined') {
      try {
        const storedUser = localStorage.getItem("userDto");
        if (storedUser) {
          return JSON.parse(storedUser);
        }
      } catch (error) {
        console.error("Error parsing userDto:", error);
      }
    }
    return null;
  });
  const logout = () => {
    localStorage.removeItem("userDto");
    setUserDto(null);
  };
  return (
    <LayoutContext.Provider value={{ userDto ,logout}}>
      {children}
    </LayoutContext.Provider>
  );
}
export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
