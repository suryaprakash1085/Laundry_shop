const KEY = "lavender_user_auth";
const PROFILE_KEY = "lavender_user_profile";
const DEMO_USER = "user";
const DEMO_PASS = "user123";

export interface UserProfile {
  username: string;
  name: string;
  email: string;
}

export const userAuth = {
  login(username: string, password: string): UserProfile | null {
    if (username.trim() === DEMO_USER && password === DEMO_PASS) {
      const profile: UserProfile = { username: DEMO_USER, name: "Priya Ramesh", email: "priya@example.com" };
      sessionStorage.setItem(KEY, "1");
      sessionStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      return profile;
    }
    return null;
  },
  logout() {
    sessionStorage.removeItem(KEY);
    sessionStorage.removeItem(PROFILE_KEY);
  },
  isAuthed() {
    return typeof window !== "undefined" && sessionStorage.getItem(KEY) === "1";
  },
  profile(): UserProfile | null {
    try {
      const raw = sessionStorage.getItem(PROFILE_KEY);
      return raw ? (JSON.parse(raw) as UserProfile) : null;
    } catch {
      return null;
    }
  },
  demo: { username: DEMO_USER, password: DEMO_PASS },
};
