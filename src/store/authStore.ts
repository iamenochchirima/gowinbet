import appConfig from "@/configs/app.config";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/@types/auth";
import { PackagePricing } from "@/@types/types";

type Session = {
  signedIn: boolean;
};

type AuthState = {
  session: Session;
  user: User;
  userEmail: string;
  selectedPackage: PackagePricing | null;
};

type AuthAction = {
  setSessionSignedIn: (payload: boolean) => void;
  setUser: (payload: User) => void;
  setUserEmail: (payload: string) => void;
  setSelectedPackage: (payload: PackagePricing | null) => void;
};

const initialState: AuthState = {
  session: {
    signedIn: false,
  },
  user: {
    avatar: "",
    firstname: "",
    lastname: "",
    email: "",
    authority: ["USER"],
    subscription: null,
    isEmailVerified: false,
  },
  userEmail: "",
  selectedPackage: null,
};

export const useSessionUser = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      ...initialState,
      setSessionSignedIn: (payload) =>
        set((state) => ({
          session: {
            ...state.session,
            signedIn: payload,
          },
        })),
      setUser: (payload) => {
        set((state) => ({
          user: {
            ...state.user,
            ...payload,
          },
        }))
      },
      setUserEmail: (payload) =>
        set((state) => ({
          userEmail: payload,
        })),
      setSelectedPackage: (payload) => {
        set((state) => ({
          selectedPackage: payload,
        }))
      }
    }),
    {
      name: "sessionUser",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
