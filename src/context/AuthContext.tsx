import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const LOCAL_AUTH_KEY = "construtora_local_auth";
const ADMIN_PASSWORD = "16981698";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLocalAuth, setIsLocalAuth] = useState<boolean>(() => {
    return sessionStorage.getItem(LOCAL_AUTH_KEY) === "true";
  });
  const [isLoading, setIsLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) return;

    let isMounted = true;
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("Não foi possível verificar a sessão administrativa:", error);
      }
      if (isMounted) {
        setSession(data.session);
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    if (!supabase) {
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem(LOCAL_AUTH_KEY, "true");
        setIsLocalAuth(true);
        return;
      }
      throw new Error("Senha incorreta. (Senha padrão local: 16981698)");
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (data.user.app_metadata.role !== "admin") {
      await supabase.auth.signOut();
      throw new Error("Esta conta não tem permissão administrativa.");
    }
  };

  const logout = async () => {
    if (!supabase) {
      sessionStorage.removeItem(LOCAL_AUTH_KEY);
      setIsLocalAuth(false);
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const isAuthenticated = supabase
    ? session?.user.app_metadata.role === "admin"
    : isLocalAuth;

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      isConfigured: Boolean(supabase),
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

