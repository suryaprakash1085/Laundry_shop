import { RequestHandler } from "express";
// import db from "@/server/db";
import db from "../db"
import { ShopSettings } from "@shared/api";

export const getSettings: RequestHandler = async (req, res) => {
  try {
    let settings = await db("settings").first();

    if (!settings) {
      // Create default settings if none exist
      await db("settings").insert({
        shop_name: "MS Laundry & Dry Cleaning",
        email: "contact@mslaundry.com",
        phone: "+91 98765 43210",
        address: "123 Main Street, Downtown",
        city: "New Delhi",
        zip_code: "110001",
        website: "www.mslaundry.com",
        opening_hours: JSON.stringify({
          monday: { open: "08:00", close: "20:00", closed: false },
          tuesday: { open: "08:00", close: "20:00", closed: false },
          wednesday: { open: "08:00", close: "20:00", closed: false },
          thursday: { open: "08:00", close: "20:00", closed: false },
          friday: { open: "08:00", close: "20:00", closed: false },
          saturday: { open: "09:00", close: "19:00", closed: false },
          sunday: { open: "10:00", close: "18:00", closed: false },
        }),
      });

      settings = await db("settings").first();
    }

    res.json(settings);
  } catch (error) {
    console.error("Get settings error:", error);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
};

export const updateSettings: RequestHandler = async (req, res) => {
  try {
    const {
      shop_name,
      email,
      phone,
      address,
      city,
      zip_code,
      website,
      opening_hours,
      logo,
    } = req.body;

    let settings = await db("settings").first();

    if (!settings) {
      // Create if doesn't exist
      await db("settings").insert({
        shop_name: shop_name || "MS Laundry & Dry Cleaning",
        email: email || "contact@mslaundry.com",
        phone: phone || "+91 98765 43210",
        address: address || "",
        city: city || "",
        zip_code: zip_code || "",
        website: website || "",
        opening_hours: opening_hours ? JSON.stringify(opening_hours) : null,
        logo: logo || null,
      });
    } else {
      // Update existing
      await db("settings").update({
        shop_name: shop_name ?? settings.shop_name,
        email: email ?? settings.email,
        phone: phone ?? settings.phone,
        address: address ?? settings.address,
        city: city ?? settings.city,
        zip_code: zip_code ?? settings.zip_code,
        website: website ?? settings.website,
        opening_hours:
          opening_hours !== undefined
            ? JSON.stringify(opening_hours)
            : settings.opening_hours,
        logo: logo ?? settings.logo,
        updated_at: db.fn.now(),
      });
    }

    settings = await db("settings").first();
    res.json(settings);
  } catch (error) {
    console.error("Update settings error:", error);
    res.status(500).json({ error: "Failed to update settings" });
  }
};
