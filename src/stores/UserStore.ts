import { create } from "zustand";
import { User } from "./UserType";
import { getUserFirestore } from "@/firebase/firestore/FirestoreUser";

interface UserState {
  user: User | null;
  getUser: (email: string) => void;
  updateUser: (user: User) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  updateUser: (user: User) => {
    set({ user: user });
  },
  getUser: async (email: string) => {
    set({ user: await getUserFirestore(email) });
  },
}));
