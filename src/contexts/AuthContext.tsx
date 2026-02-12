"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

interface User {
  id: number;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string,
    is_newsletter?: boolean
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (
    updates: Partial<User>
  ) => Promise<{ success: boolean; error?: string }>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [toastShown, setToastShown] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      if (!isSupabaseConfigured() || !supabase) {
        setIsLoading(false);
        return;
      }

      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error || !session?.access_token) {
          localStorage.removeItem("supabase-auth-token");
          setUser(null);
        } else {
          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("id, name, email, status, created_at, updated_at, is_admin")
            .eq("email", session.user.email)
            .single();

          if (userError || userData.is_admin) {
            throw new Error(userError?.message || "Admin users not allowed");
          }

          setUser({
            id: userData.id,
            name: userData.name || session.user.user_metadata?.name || "User",
            email: userData.email || session.user.email || "",
            status: userData.status || true,
            created_at: userData.created_at || new Date().toISOString(),
            updated_at: userData.updated_at || new Date().toISOString(),
          });
          localStorage.setItem("supabase-auth-token", session.access_token);
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        localStorage.removeItem("supabase-auth-token");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    if (!supabase) {
      return;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.access_token) {
        localStorage.removeItem("supabase-auth-token");
        setUser(null);
      } else if (supabase) {
        supabase
          .from("users")
          .select("id, name, email, status, created_at, updated_at, is_admin")
          .eq("email", session.user.email)
          .single()
          .then(({ data, error }) => {
            if (error || data?.is_admin) {
              localStorage.removeItem("supabase-auth-token");
              setUser(null);
              return;
            }
            if (data) {
              setUser({
                id: data.id,
                name: data.name || session.user.user_metadata?.name || "User",
                email: data.email || session.user.email || "",
                status: data.status || true,
                created_at: data.created_at || new Date().toISOString(),
                updated_at: data.updated_at || new Date().toISOString(),
              });
              localStorage.setItem("supabase-auth-token", session.access_token);
            }
          });
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setToastShown(false);

    if (!isSupabaseConfigured() || !supabase) {
      const errorMsg = "Supabase is not configured. Please check your environment variables.";
      if (!toastShown) {
        setToastShown(true);
        toast.error(errorMsg);
      }
      setIsLoading(false);
      throw new Error(errorMsg);
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (!toastShown) {
          setToastShown(true);
          toast.error(error.message);
        }
        throw error;
      }

      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, name, email, status, created_at, updated_at, is_admin")
        .eq("email", email)
        .single();

      if (userError) {
        if (!toastShown) {
          setToastShown(true);
          toast.error("User data fetch failed.");
        }
        throw userError;
      }

      if (!userData?.status) {
        if (!toastShown) {
          setToastShown(true);
          toast.error("Your account is not active.");
        }
        await supabase.auth.signOut();
        throw new Error("Inactive user");
      }

      if (userData.is_admin) {
        if (!toastShown) {
          setToastShown(true);
        }
        await supabase.auth.signOut();
        throw new Error("Admin users not allowed");
      }

      setUser({
        id: userData.id,
        name: userData.name || data.user.user_metadata?.name || "User",
        email: userData.email || data.user.email || "",
        status: userData.status || true,
        created_at: userData.created_at || new Date().toISOString(),
        updated_at: userData.updated_at || new Date().toISOString(),
      });
      localStorage.setItem("supabase-auth-token", data.session.access_token);

      toast.success("Successfully logged in!");
      router.replace("/");
    } catch (error) {
      console.error("Login failed:", error);
      if (!toastShown) {
        setToastShown(true);
        toast.error("Login failed. Please try again.");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    is_newsletter: boolean = false
  ) => {
    setIsLoading(true);
    setToastShown(false);

    if (!isSupabaseConfigured() || !supabase) {
      const errorMsg = "Supabase is not configured. Please check your environment variables.";
      if (!toastShown) {
        setToastShown(true);
        toast.error(errorMsg);
      }
      setIsLoading(false);
      throw new Error(errorMsg);
    }

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });

      if (authError) {
        if (!toastShown) {
          setToastShown(true);
          toast.error(authError.message);
        }
        throw authError;
      }

      if (!data.user || !data.session) {
        if (!toastShown) {
          setToastShown(true);
          toast.error("Signup failed: No user or session returned.");
        }
        throw new Error("No user or session returned.");
      }

      const currentTime = new Date().toISOString();
      const { data: userData, error: dbError } = await supabase
        .from("users")
        .insert({
          name,
          email,
          created_at: currentTime,
          updated_at: currentTime,
          status: true,
          is_admin: false,
          is_newsletter: is_newsletter,
        })
        .select("id, name, email")
        .single();

      if (dbError) {
        if (!toastShown) {
          setToastShown(true);
          toast.error("Failed to save user data: " + dbError.message);
        }
        throw dbError;
      }

      setUser({
        id: userData.id,
        name: userData.name || name,
        email: userData.email || email,
        status: true,
        created_at: currentTime,
        updated_at: currentTime,
      });
      localStorage.setItem("supabase-auth-token", data.session.access_token);

      localStorage.setItem("isSignedUp", "true");

      toast.success("Successfully signed up!");
      router.push("/login");
    } catch (error) {
      console.error("Signup failed:", error);
      if (!toastShown) {
        setToastShown(true);
        toast.error("Signup failed. Please try again.");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setToastShown(false);

    if (!isSupabaseConfigured() || !supabase) {
      const errorMsg = "Supabase is not configured. Please check your environment variables.";
      if (!toastShown) {
        setToastShown(true);
        toast.error(errorMsg);
      }
      setIsLoading(false);
      throw new Error(errorMsg);
    }

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        if (!toastShown) {
          setToastShown(true);
          toast.error(error.message);
        }
        throw error;
      }

      setUser(null);
      localStorage.removeItem("supabase-auth-token");
      toast.success("Successfully logged out!");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      if (!toastShown) {
        setToastShown(true);
        toast.error("Logout failed. Please try again.");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    setIsLoading(true);
    setToastShown(false);

    if (!isSupabaseConfigured() || !supabase) {
      const errorMsg = "Supabase is not configured. Please check your environment variables.";
      if (!toastShown) {
        setToastShown(true);
        toast.error(errorMsg);
      }
      setIsLoading(false);
      return { success: false, error: errorMsg };
    }

    try {
      if (!user) {
        return { success: false, error: "No user logged in" };
      }

      const { error } = await supabase
        .from("users")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) {
        if (!toastShown) {
          setToastShown(true);
          toast.error("Failed to update profile: " + error.message);
        }
        return { success: false, error: error.message };
      }

      // Update local user state
      setUser((prev) =>
        prev
          ? { ...prev, ...updates, updated_at: new Date().toISOString() }
          : null
      );

      toast.success("Profile updated successfully!");
      return { success: true };
    } catch (error) {
      console.error("Update profile error:", error);
      if (!toastShown) {
        setToastShown(true);
        toast.error("Update failed. Please try again.");
      }
      return { success: false, error: "An unexpected error occurred" };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
