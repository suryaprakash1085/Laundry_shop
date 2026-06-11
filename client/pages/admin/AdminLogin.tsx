import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Sparkles, User, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { adminAuth } from "@/utils/adminAuth";

const LampSVG = ({ isOn }: { isOn: boolean }) => (
  <svg width="72" height="88" viewBox="0 0 72 88" fill="none">
    <rect x="33" y="48" width="6" height="28" rx="3" fill="#6b4a14"/>
    <ellipse cx="36" cy="78" rx="14" ry="4.5" fill="#4a2e06"/>
    <ellipse cx="36" cy="76" rx="12" ry="3.5" fill="#6b4a14"/>
    <path d="M11 46 Q13 24 36 22 Q59 24 61 46 Q50 54 36 54 Q22 54 11 46Z"
      fill={isOn ? "#EF9F27" : "#c17d18"}
      style={{ transition: "fill 0.3s" }}
    />
    <path d="M11 46 Q22 54 36 54 Q50 54 61 46 Q53 50 36 50 Q19 50 11 46Z" fill="#7a4a0a"/>
    <circle cx="36" cy="46" r="5"
      fill={isOn ? "#FAEEDA" : "#2a1a00"}
      style={{ transition: "fill 0.3s" }}
    />
  </svg>
);

const RAYS = [-35, -15, 5, 25, 45];

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: string } };
  const [isOn, setIsOn] = useState(false);
  const [flickering, setFlickering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleLampClick = () => {
    if (isOn) { setIsOn(false); return; }
    setFlickering(true);
    const timings = [0, 80, 60, 70, 80, 70];
    let i = 0;
    const tick = () => {
      if (i >= timings.length) { setFlickering(false); setIsOn(true); return; }
      setTimeout(tick, timings[i++]);
    };
    tick();
  };

  const handleSubmit = () => {
    const next: typeof errors = {};
    if (!username.trim()) next.username = "Username is required";
    if (!password) next.password = "Password is required";
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    setTimeout(() => {
      if (adminAuth.login(username, password)) {
        toast.success("Welcome back, Admin!");
        navigate(location.state?.from || "/admin", { replace: true });
      } else {
        toast.error("Invalid credentials");
        setErrors({ password: "Incorrect username or password" });
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0b08] relative overflow-hidden px-4 py-12">
      {/* stars */}
      {Array.from({ length: 55 }).map((_, i) => (
        <div key={i} className="absolute rounded-full bg-white"
          style={{
            width: `${Math.random() * 2 + 1}px`, height: `${Math.random() * 2 + 1}px`,
            top: `${Math.random() * 85}%`, left: `${Math.random() * 100}%`,
            opacity: 0.2, animation: `twinkle ${2 + Math.random() * 2}s infinite ${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* floor glow */}
      <motion.div
        animate={{ opacity: isOn ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-44 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(239,159,39,0.22) 0%, transparent 70%)" }}
      />

      {/* lamp */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 cursor-pointer z-10" onClick={handleLampClick}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-7 bg-amber-700/40 rounded" />
        <motion.div
          animate={{ opacity: isOn ? 1 : 0, scale: isOn ? 1 : 0.5 }}
          transition={{ duration: 0.4 }}
          className="absolute w-20 h-20 rounded-full top-8 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(250,199,117,0.9) 0%, rgba(239,159,39,0.4) 40%, transparent 70%)" }}
        />
        {RAYS.map((deg, i) => (
          <motion.div key={i}
            animate={{ opacity: isOn ? 1 : 0 }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="absolute w-px h-16 pointer-events-none"
            style={{
              top: 68, left: "50%",
              transformOrigin: "top center",
              transform: `translateX(-50%) rotate(${deg}deg)`,
              background: "linear-gradient(to bottom, rgba(250,199,117,0.5), transparent)",
            }}
          />
        ))}
        <motion.div animate={{ scale: flickering ? [1, 1.05, 0.98, 1.04, 1] : 1 }} transition={{ duration: 0.35 }}>
          <LampSVG isOn={isOn || flickering} />
        </motion.div>
      </div>

      {/* card */}
      <motion.div
        animate={{ background: isOn ? "rgba(255,251,244,0.97)" : "rgba(255,251,244,0.04)" }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-sm rounded-2xl px-8 pt-28 pb-6"
        style={{ border: "0.5px solid rgba(250,199,117,0.2)" }}
      >
        <AnimatePresence>
          {!isOn && (
            <motion.p
              initial={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="text-center text-xs text-amber-400/70 mb-3 animate-pulse"
            >
              tap the lamp to begin
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOn && (
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
            >
              <h1 className="text-center text-[17px] font-medium text-amber-900 mb-1">Admin Sign In</h1>
              <p className="text-center text-[12.5px] text-amber-700 mb-5">Secure access to the control panel</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOn && (
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="space-y-3"
            >
              {/* username */}
              <div>
                <label className="block text-[11.5px] font-medium text-amber-700 mb-1">Username</label>
                <div className="relative">
                  <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-amber-600" />
                  <input type="text" placeholder="admin" value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full h-9 pl-8 pr-3 rounded-lg text-[13.5px] text-amber-950 placeholder:text-amber-300"
                    style={{ background: "rgba(250,238,218,0.7)", border: "0.5px solid rgba(186,117,23,0.4)", outline: "none" }}
                  />
                </div>
                {errors.username && <p className="text-[11px] text-red-700 mt-1">{errors.username}</p>}
              </div>
              {/* password */}
              <div>
                <label className="block text-[11.5px] font-medium text-amber-700 mb-1">Password</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-amber-600" />
                  <input type={showPwd ? "text" : "password"} placeholder="••••••••" value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full h-9 pl-8 pr-8 rounded-lg text-[13.5px] text-amber-950 placeholder:text-amber-300"
                    style={{ background: "rgba(250,238,218,0.7)", border: "0.5px solid rgba(186,117,23,0.4)", outline: "none" }}
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-amber-600">
                    {showPwd ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                  </button>
                </div>
                {errors.password && <p className="text-[11px] text-red-700 mt-1">{errors.password}</p>}
              </div>

              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                onClick={handleSubmit} disabled={loading}
                className="w-full h-10 rounded-lg font-medium text-[13.5px] text-amber-900 flex items-center justify-center gap-2 mt-1 disabled:opacity-55"
                style={{ background: "linear-gradient(135deg,#EF9F27,#FAC775)" }}
              >
                <ShieldCheck className="h-4 w-4" />
                {loading ? "Signing in…" : "Sign In"}
              </motion.button>

              <p className="text-center text-[11px] text-amber-700 flex items-center justify-center gap-1 mt-1">
                <Sparkles className="h-3 w-3" />
                Demo: <b>admin</b> / <b>admin123</b>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}