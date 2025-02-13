"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(Cookies.get("token") || null);

  useEffect(() => {
    if (token) {
      Cookies.set("token", token);
    } else {
      Cookies.remove("token");
    }
  }, [token]);

  useEffect(() => {
    const handleCookieChange = () => {
      const newToken = Cookies.get("token") || null;
      if (newToken !== token) {
        setTokenState(newToken);
      }
    };
    const interval = setInterval(handleCookieChange, 1000);
    return () => clearInterval(interval);
  }, [token]);

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};