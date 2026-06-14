import { RequestHandler } from "express";
import db from "../db";
import { Staff } from "@shared/api";

export const getStaff: RequestHandler = async (req, res) => {
  try {
    const staff = await db("staff").orderBy("id", "asc");
    res.json(staff);
  } catch (error) {
    console.error("Get staff error:", error);
    res.status(500).json({ error: "Failed to fetch staff" });
  }
};

export const getStaffById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const staff = await db("staff").where("id", id).first();

    if (!staff) {
      return res.status(404).json({ error: "Staff member not found" });
    }

    res.json(staff);
  } catch (error) {
    console.error("Get staff member error:", error);
    res.status(500).json({ error: "Failed to fetch staff member" });
  }
};

export const createStaff: RequestHandler = async (req, res) => {
  try {
    const { name, email, phone, role, permissions } = req.body;

    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ error: "Name, email, and phone are required" });
    }

    const [row] = await db("staff")
      .insert({
        name,
        email,
        phone,
        role: role || "staff",
        permissions: JSON.stringify(permissions || []),
        active: true,
      })
      .returning("id");

    const id = row?.id ?? row;
    const staff = await db("staff").where("id", id).first();
    res.status(201).json(staff);
  } catch (error) {
    console.error("Create staff error:", error);
    res.status(500).json({ error: "Failed to create staff member" });
  }
};

export const updateStaff: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role, permissions, active } = req.body;

    const staff = await db("staff").where("id", id).first();
    if (!staff) {
      return res.status(404).json({ error: "Staff member not found" });
    }

    await db("staff")
      .where("id", id)
      .update({
        name: name ?? staff.name,
        email: email ?? staff.email,
        phone: phone ?? staff.phone,
        role: role ?? staff.role,
        permissions:
          permissions !== undefined
            ? JSON.stringify(permissions)
            : staff.permissions,
        active: active !== undefined ? active : staff.active,
        updated_at: db.fn.now(),
      });

    const updated = await db("staff").where("id", id).first();
    res.json(updated);
  } catch (error) {
    console.error("Update staff error:", error);
    res.status(500).json({ error: "Failed to update staff member" });
  }
};

export const deleteStaff: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const staff = await db("staff").where("id", id).first();
    if (!staff) {
      return res.status(404).json({ error: "Staff member not found" });
    }

    await db("staff").where("id", id).del();
    res.json({ message: "Staff member deleted successfully" });
  } catch (error) {
    console.error("Delete staff error:", error);
    res.status(500).json({ error: "Failed to delete staff member" });
  }
};
