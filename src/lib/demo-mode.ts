import { useAuthStore } from "@/stores/auth.store";
import type { User } from "@/types/api.types";

export const DEMO_MODE_COOKIE = "kuizu_demo_mode";
export const DEMO_SESSION_COOKIE = "kuizu_session";
export const DEMO_STORAGE_KEY = "kuizu_demo_mode";
export const DEMO_USER_STORAGE_KEY = "kuizu_offline_demo_user";
export const DEMO_COMPLETED_LESSONS_KEY = "kuizu_completed_lessons";
export const DEMO_CHANGE_EVENT = "kuizu:demomode-changed";

export const INITIAL_DEMO_USER: User = {
  id: "demo-user-1",
  username: "Shio",
  email: "shio@kuizu.app",
  role: "user",
  xp: 1450,
  hearts: 5,
  gems: 850,
  streak: {
    count: 7,
    lastActiveDate: null,
  },
  streakFreezes: 2,
  league: "Diamond",
  avatarUrl: "",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: new Date().toISOString(),
};

/**
 * Checks whether Demo Mode is active via build env, document cookies, or localStorage
 */
export function isDemoModeActive(): boolean {
  if (process.env.NEXT_PUBLIC_DEMO_MODE === "true") {
    return true;
  }

  if (typeof window !== "undefined") {
    // 1. Check document.cookie
    if (document.cookie) {
      if (
        document.cookie.includes(`${DEMO_MODE_COOKIE}=true`) ||
        document.cookie.includes(`${DEMO_SESSION_COOKIE}=demo-token`)
      ) {
        return true;
      }
    }

    // 2. Check localStorage flag
    try {
      if (localStorage.getItem(DEMO_STORAGE_KEY) === "true") {
        return true;
      }
    } catch {
      // LocalStorage access restricted (e.g. private browsing)
    }
  }

  return false;
}

/**
 * Enables demo mode at runtime, persists session cookies, and sets demo user
 */
export async function enableDemoMode(): Promise<void> {
  if (typeof window === "undefined") return;

  // 1. Set 30-day demo cookies
  const cookieOptions = "path=/; max-age=2592000; SameSite=Lax";
  document.cookie = `${DEMO_MODE_COOKIE}=true; ${cookieOptions}`;
  document.cookie = `${DEMO_SESSION_COOKIE}=demo-token; ${cookieOptions}`;

  // 2. Persist in localStorage
  try {
    localStorage.setItem(DEMO_STORAGE_KEY, "true");
    if (!localStorage.getItem(DEMO_USER_STORAGE_KEY)) {
      localStorage.setItem(
        DEMO_USER_STORAGE_KEY,
        JSON.stringify(INITIAL_DEMO_USER),
      );
    }
    if (!localStorage.getItem(DEMO_COMPLETED_LESSONS_KEY)) {
      localStorage.setItem(
        DEMO_COMPLETED_LESSONS_KEY,
        JSON.stringify(["lesson-1", "lesson-cn-1"]),
      );
    }
  } catch {
    // Ignore storage quota or access errors
  }

  // 3. Populate auth store
  useAuthStore.getState().setUser(INITIAL_DEMO_USER);

  // 4. Notify all reactive components
  window.dispatchEvent(
    new CustomEvent(DEMO_CHANGE_EVENT, { detail: { active: true } }),
  );
}

/**
 * Disables demo mode, revokes demo cookies, and resets local state
 */
export async function disableDemoMode(): Promise<void> {
  if (typeof window === "undefined") return;

  // 1. Clear cookies
  document.cookie = `${DEMO_MODE_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  document.cookie = `${DEMO_SESSION_COOKIE}=; path=/; max-age=0; SameSite=Lax`;

  // 2. Remove localStorage flag
  try {
    localStorage.removeItem(DEMO_STORAGE_KEY);
  } catch {
    // Ignore storage errors
  }

  // 3. Clear auth store
  useAuthStore.getState().setUser(null);

  // 4. Notify reactive components
  window.dispatchEvent(
    new CustomEvent(DEMO_CHANGE_EVENT, { detail: { active: false } }),
  );
}

/**
 * Resets demo user progress (XP, gems, hearts, completed lessons) back to defaults
 */
export function resetDemoProgress(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(DEMO_USER_STORAGE_KEY);
    localStorage.removeItem(DEMO_COMPLETED_LESSONS_KEY);
    localStorage.setItem(
      DEMO_USER_STORAGE_KEY,
      JSON.stringify(INITIAL_DEMO_USER),
    );
    localStorage.setItem(
      DEMO_COMPLETED_LESSONS_KEY,
      JSON.stringify(["lesson-1", "lesson-cn-1"]),
    );
  } catch {
    // Ignore storage errors
  }

  useAuthStore.getState().setUser({ ...INITIAL_DEMO_USER });

  window.dispatchEvent(
    new CustomEvent(DEMO_CHANGE_EVENT, {
      detail: { active: true, reset: true },
    }),
  );
}
