import { RequestHandler } from "express";
import db from "../db"

import { Customer } from "@shared/api";

export const getCustomers: RequestHandler = async (req, res) => {
  try {
    const customers = await db("customers").orderBy("id", "asc");
    res.json(customers);
  } catch (error) {
    console.error("Get customers error:", error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

export const getCustomerById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await db("customers").where("id", id).first();

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(customer);
  } catch (error) {
    console.error("Get customer error:", error);
    res.status(500).json({ error: "Failed to fetch customer" });
  }
};

export const createCustomer: RequestHandler = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone are required" });
    }

    const [id] = await db("customers").insert({
      name,
      email: email || null,
      phone,
      address: address || null,
      total_orders: 0,
      total_spent: 0,
    });

    const customer = await db("customers").where("id", id).first();
    res.status(201).json(customer);
  } catch (error) {
    console.error("Create customer error:", error);
    res.status(500).json({ error: "Failed to create customer" });
  }
};

export const updateCustomer: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    const customer = await db("customers").where("id", id).first();
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    await db("customers")
      .where("id", id)
      .update({
        name: name ?? customer.name,
        email: email ?? customer.email,
        phone: phone ?? customer.phone,
        address: address ?? customer.address,
        updated_at: db.fn.now(),
      });

    const updated = await db("customers").where("id", id).first();
    res.json(updated);
  } catch (error) {
    console.error("Update customer error:", error);
    res.status(500).json({ error: "Failed to update customer" });
  }
};

export const deleteCustomer: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await db("customers").where("id", id).first();
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    await db("customers").where("id", id).del();
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Delete customer error:", error);
    res.status(500).json({ error: "Failed to delete customer" });
  }
};
