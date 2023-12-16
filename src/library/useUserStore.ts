import type { User } from "firebase/auth";

import create from "zustand";

type StoreType = {
  currentUser: undefined | null | User;
  setCurrentUser: (user: User | null) => void;
};

export const useUserStore = create<StoreType>((set) => ({
  currentUser: undefined,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
