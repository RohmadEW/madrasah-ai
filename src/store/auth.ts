import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// User type
export interface User {
  email: string;
  name?: string;
}

// Auth state atoms
export const isAuthenticatedAtom = atomWithStorage<boolean>(
  "isAuthenticated",
  false
);

export const userAtom = atomWithStorage<User | null>("user", null);

// Derived atom for auth check
export const authStateAtom = atom((get) => ({
  isAuthenticated: get(isAuthenticatedAtom),
  user: get(userAtom),
}));
