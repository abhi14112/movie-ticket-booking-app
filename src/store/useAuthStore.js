import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user")) || null, 

    setUserData: (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        set({ user: userData });
    },
    logout: () => {
        localStorage.removeItem("user");
        set({ user: null });
    },
}));

export default useAuthStore;