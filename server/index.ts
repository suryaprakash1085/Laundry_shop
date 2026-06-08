import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleLogin, handleLogout } from "./routes/auth";
import { handleGetDashboardStats } from "./routes/dashboard";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "./routes/services";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "./routes/customers";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "./routes/orders";
import {
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
} from "./routes/staff";
import {
  getDailyReport,
  getMonthlyReport,
  getOrderSummary,
} from "./routes/reports";
import { getSettings, updateSettings } from "./routes/settings";
import {
  getCustomization,
  updateCustomization,
  getThemeConfig,
} from "./routes/customization";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Admin Panel API routes
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/logout", handleLogout);
  app.get("/api/dashboard/stats", handleGetDashboardStats);

  // Services routes
  app.get("/api/services", getServices);
  app.get("/api/services/:id", getServiceById);
  app.post("/api/services", createService);
  app.patch("/api/services/:id", updateService);
  app.delete("/api/services/:id", deleteService);

  // Customers routes
  app.get("/api/customers", getCustomers);
  app.get("/api/customers/:id", getCustomerById);
  app.post("/api/customers", createCustomer);
  app.patch("/api/customers/:id", updateCustomer);
  app.delete("/api/customers/:id", deleteCustomer);

  // Orders routes
  app.get("/api/orders", getOrders);
  app.get("/api/orders/:id", getOrderById);
  app.post("/api/orders", createOrder);
  app.patch("/api/orders/:id", updateOrder);
  app.delete("/api/orders/:id", deleteOrder);

  // Staff routes
  app.get("/api/staff", getStaff);
  app.get("/api/staff/:id", getStaffById);
  app.post("/api/staff", createStaff);
  app.patch("/api/staff/:id", updateStaff);
  app.delete("/api/staff/:id", deleteStaff);

  // Reports routes
  app.get("/api/reports/daily", getDailyReport);
  app.get("/api/reports/monthly", getMonthlyReport);
  app.get("/api/reports/summary", getOrderSummary);

  // Settings routes
  app.get("/api/settings", getSettings);
  app.patch("/api/settings", updateSettings);

  // Customization routes
  app.get("/api/customization", getCustomization);
  app.patch("/api/customization", updateCustomization);
  app.get("/api/customization/theme", getThemeConfig);

  return app;
}
