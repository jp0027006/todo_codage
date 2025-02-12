"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

interface SessionContextType {
  sessionid: string | null;
  setSessionid: React.Dispatch<React.SetStateAction<string | null>>;
}


const SessionContext = createContext<SessionContextType | undefined>(undefined);


export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [sessionid, setSessionid] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    setSessionid(token || null);
  }, []);

  return (
    <SessionContext.Provider value={{ sessionid, setSessionid }}>
      {children}
    </SessionContext.Provider>
  );
};
