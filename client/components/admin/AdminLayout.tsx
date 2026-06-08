import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Search } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";
import ThemeToggle from "../ThemeToggle";

const AdminLayout = () => {
  const location = useLocation();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-background to-primary/5">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 sticky top-0 z-30 glass border-b border-border/50 flex items-center gap-3 px-4">
            <SidebarTrigger className="rounded-lg" />
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  placeholder="Search anything..."
                  className="w-full h-10 pl-9 pr-3 rounded-xl bg-muted/40 border border-border/40 focus:border-primary/50 focus:bg-background outline-none text-sm transition-smooth"
                />
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="relative h-10 w-10 rounded-xl hover:bg-muted flex items-center justify-center transition-smooth">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive animate-pulse" />
              </button>
              <ThemeToggle />
            </div>
          </header>
          <AnimatePresence mode="wait">
            <motion.main
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="flex-1 p-6"
            >
              <Outlet />
            </motion.main>
          </AnimatePresence>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
