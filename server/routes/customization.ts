import { RequestHandler } from "express";
import db from "../db";

export const getCustomization: RequestHandler = async (req, res) => {
  try {
    let customization = await db("customization").first();

    if (!customization) {
      await db("customization").insert({
        app_name: "MS Laundry",
        primary_color: "#3b82f6",
        secondary_color: "#1f2937",
        accent_color: "#10b981",
        dark_mode_enabled: false,
        enable_customer_portal: true,
        enable_order_tracking: true,
        enable_notifications: true,
        enable_reports: true,
        enable_staff_management: true,
        enable_loyalty_program: false,
        default_order_type: "mixed",
        min_order_amount: 100,
        default_delivery_days: 2,
        enable_express_service: true,
        express_service_charge: 50,
        notify_order_received: true,
        notify_order_ready: true,
        notify_order_delivered: true,
        notify_low_inventory: true,
        admin_email: null,
        send_daily_summary: true,
        summary_email_time: "09:00",
        items_per_page: 10,
        date_format: "DD/MM/YYYY",
        currency: "INR",
        auto_generate_invoice: true,
        allow_customer_edits: true,
      });

      customization = await db("customization").first();
    }

    res.json(customization);
  } catch (error) {
    console.error("Get customization error:", error);
    res.status(500).json({ error: "Failed to fetch customization" });
  }
};

export const updateCustomization: RequestHandler = async (req, res) => {
  try {
    const updates = req.body;

    let customization = await db("customization").first();

    if (!customization) {
      await db("customization").insert(updates);
    } else {
      await db("customization").update({
        ...updates,
        updated_at: db.fn.now(),
      });
    }

    customization = await db("customization").first();
    res.json(customization);
  } catch (error) {
    console.error("Update customization error:", error);
    res.status(500).json({ error: "Failed to update customization" });
  }
};

export const getThemeConfig: RequestHandler = async (req, res) => {
  try {
    const customization = await db("customization").first();

    if (!customization) {
      return res.json({
        primaryColor: "#3b82f6",
        secondaryColor: "#1f2937",
        accentColor: "#10b981",
        darkMode: false,
      });
    }

    res.json({
      primaryColor: customization.primary_color,
      secondaryColor: customization.secondary_color,
      accentColor: customization.accent_color,
      darkMode: customization.dark_mode_enabled,
      appName: customization.app_name,
    });
  } catch (error) {
    console.error("Get theme config error:", error);
    res.status(500).json({ error: "Failed to fetch theme config" });
  }
};
