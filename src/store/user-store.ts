import { User } from 'firebase/auth';
import { create } from 'zustand';

type UserStoreState = {
	user: User | null;
	setUser: (user: User | null) => void;
};

export const useStore = create<UserStoreState>((set) => ({
	user: null,
	setUser: (user) => set(() => ({ user })),
}));
