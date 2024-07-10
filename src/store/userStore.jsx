import { create } from "zustand";
import { UserService } from "src/services/DatabaseService";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });
    try {
      const docSnap = await UserService.get(uid);
      set({ currentUser: docSnap?.data(), isLoading: false });
    } catch (err) {
      return set({ currentUser: null, isLoading: false });
    }
  },
}));
