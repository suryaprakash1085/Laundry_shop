import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Users, Sparkles, Tag, CalendarCheck, MessageSquare,
  Palette, Settings, BarChart3, Bell, LogOut, WashingMachine,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Services", url: "/admin/services", icon: Sparkles },
  { title: "Pricing", url: "/admin/pricing", icon: Tag },
  { title: "Bookings", url: "/admin/bookings", icon: CalendarCheck },
  { title: "Contact", url: "/admin/contact", icon: MessageSquare },
];

const systemItems = [
  { title: "Customization", url: "/admin/customization", icon: Palette },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Notifications", url: "/admin/notifications", icon: Bell },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
  const { state } = useSidebar();
  const { pathname } = useLocation();
  const collapsed = state === "collapsed";

  const renderItem = (item: typeof mainItems[number]) => {
    const active = pathname === item.url;
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild isActive={active} className="h-11 group/item">
          <NavLink to={item.url} end className="relative flex items-center gap-3 rounded-xl px-3">
            {active && (
              <motion.span
                layoutId="admin-active"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/30"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className={`relative z-10 flex items-center justify-center h-8 w-8 rounded-lg transition-smooth ${active ? "gradient-primary text-primary-foreground shadow-soft" : "bg-muted/50 text-foreground/70 group-hover/item:bg-primary/15 group-hover/item:text-primary"}`}>
              <item.icon className="h-4 w-4" />
            </span>
            {!collapsed && (
              <span className={`relative z-10 text-sm font-medium ${active ? "text-primary" : ""}`}>
                {item.title}
              </span>
            )}
            {active && !collapsed && (
              <span className="relative z-10 ml-auto h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_hsl(var(--primary))]" />
            )}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarHeader className="p-4 border-b border-border/50">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
            <WashingMachine className="h-5 w-5 text-primary-foreground" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-success border-2 border-background" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <p className="font-bold text-sm text-gradient">Washy Admin</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Control Center</p>
            </div>
          )}
        </NavLink>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/70 px-3">Main</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">{mainItems.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          {!collapsed && <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/70 px-3">System</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">{systemItems.map(renderItem)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-border/50">
        {!collapsed ? (
          <div className="gradient-card rounded-xl p-3 border border-border/50">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">A</div>
              <div className="leading-tight flex-1">
                <p className="text-sm font-semibold">Admin</p>
                <p className="text-[10px] text-muted-foreground">admin@washy.io</p>
              </div>
              <button className="h-8 w-8 rounded-lg hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-smooth">
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <button className="h-9 w-9 mx-auto rounded-lg hover:bg-destructive/10 hover:text-destructive flex items-center justify-center transition-smooth">
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
