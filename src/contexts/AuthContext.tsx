import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import type { User } from "@/types";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    company: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserProfile = async (session: Session | null) => {
    if (!session?.user) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) {
      console.error("Profile Error:", error);
      setUser(null);
      setIsLoading(false);
      return;
    }

    const appUser: User = {
      id: profile.id,
      email: profile.email,
      name: profile.name ?? "",
      role: profile.role,
      avatar: profile.avatar ?? undefined,
      company: profile.company ?? "",
      department: profile.department ?? "",
      phone: profile.phone ?? undefined,
      createdAt: session.user.created_at,
      lastLogin: new Date().toISOString(),
    };

    setUser(appUser);
    setIsLoading(false);
  };

  useEffect(() => {
    const initialize = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      await loadUserProfile(session);
    };

    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      loadUserProfile(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setIsLoading(false);
        throw error;
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      await loadUserProfile(session);

      setIsLoading(false);
    },
    []
  );

  const signup = useCallback(
        async (
      name: string,
      email: string,
      password: string,
      company: string
    ) => {
      setIsLoading(true);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      console.log("Signup Response:", data);

      if (error) {
        setIsLoading(false);
        throw error;
      }

      if (data.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert({
            id: data.user.id,
            email,
            name,
            company,
            role: "viewer",
            department: "",
            phone: "",
            avatar: "",
          });

        if (profileError) {
  console.error("Profile Creation Error:", profileError);
  alert(JSON.stringify(profileError, null, 2));
}
      }

      const {
        data: { session },
      } = await supabase.auth.getSession();

      await loadUserProfile(session);

      setIsLoading(false);
    },
    []
  );

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}