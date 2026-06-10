import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Sparkles, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/auth/AuthCard";
import { FormField } from "@/components/auth/FormField";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { userAuth } from "@/utils/userAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!username.trim()) next.username = "Username is required";
    if (!password) next.password = "Password is required";
    setErrors(next);
    if (Object.keys(next).length) return;

    setLoading(true);
    setTimeout(() => {
      const profile = userAuth.login(username, password);
      if (profile) {
        toast.success(`Welcome back, ${profile.name.split(" ")[0]}`);
        navigate(location.state?.from || "/dashboard", { replace: true });
      } else {
        toast.error("Invalid credentials");
        setErrors({ password: "Incorrect username or password" });
      }
      setLoading(false);
    }, 400);
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-12">
      <AuthCard
        title="Sign In"
        subtitle="Access your bookings, addresses & favorites"
        icon={<LogIn className="h-7 w-7" />}
        footer={
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> Demo: <b>user</b> / <b>user123</b>
            </span>
            <p>
              Are you an administrator?{" "}
              <Link to="/admin/login" className="text-primary font-semibold hover:underline">
                Admin sign in
              </Link>
            </p>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Username"
            placeholder="user"
            icon={<User className="h-4 w-4" />}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
            autoComplete="username"
          />
          <PasswordInput
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            autoComplete="current-password"
          />
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button type="submit" disabled={loading} className="w-full h-11 bg-gradient-to-r from-primary to-sky-500 hover:opacity-95 shadow-lg">
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </motion.div>
        </form>
      </AuthCard>
    </section>
  );
};

export default Login;
