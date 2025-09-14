import useProfile from "@/hooks/useProfile";
import { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: "super_admin" | "school";
  status: "active" | "pending";
  approved_at: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
} | null;

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(null);
  const { data, isLoading } = useProfile();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(!!localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  }, [data, isLoading]);

  const value = {
    user,
    setUser,
    isAuthenticated,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
