import { RequestHandler } from "express";
import db from "../db";
import { Service } from "@shared/api";

export const getServices: RequestHandler = async (req, res) => {
  try {
    const services = await db("services").orderBy("id", "asc");
    res.json(services);
  } catch (error) {
    console.error("Get services error:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
};

export const getServiceById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await db("services").where("id", id).first();

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(service);
  } catch (error) {
    console.error("Get service error:", error);
    res.status(500).json({ error: "Failed to fetch service" });
  }
};

export const createService: RequestHandler = async (req, res) => {
  try {
    const { name, description, category, price, enabled } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const [row] = await db("services")
      .insert({
        name,
        description,
        category,
        price: parseFloat(price),
        enabled: enabled ?? true,
      })
      .returning("id");

    const id = row?.id ?? row;
    const service = await db("services").where("id", id).first();
    res.status(201).json(service);
  } catch (error) {
    console.error("Create service error:", error);
    res.status(500).json({ error: "Failed to create service" });
  }
};

export const updateService: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, price, enabled } = req.body;

    const service = await db("services").where("id", id).first();
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    await db("services")
      .where("id", id)
      .update({
        name: name ?? service.name,
        description: description ?? service.description,
        category: category ?? service.category,
        price: price !== undefined ? parseFloat(price) : service.price,
        enabled: enabled !== undefined ? enabled : service.enabled,
        updated_at: db.fn.now(),
      });

    const updated = await db("services").where("id", id).first();
    res.json(updated);
  } catch (error) {
    console.error("Update service error:", error);
    res.status(500).json({ error: "Failed to update service" });
  }
};

export const deleteService: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await db("services").where("id", id).first();
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    await db("services").where("id", id).del();
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Delete service error:", error);
    res.status(500).json({ error: "Failed to delete service" });
  }
};
