const KEY = "lavender_admin_auth";
const DEMO_USER = "admin";
const DEMO_PASS = "admin123";

export const adminAuth = {
  login(username: string, password: string) {
    if (username.trim() === DEMO_USER && password === DEMO_PASS) {
      sessionStorage.setItem(KEY, "1");
      return true;
    }
    return false;
  },
  logout() {
    sessionStorage.removeItem(KEY);
  },
  isAuthed() {
    return typeof window !== "undefined" && sessionStorage.getItem(KEY) === "1";
  },
  demo: { username: DEMO_USER, password: DEMO_PASS },
};
