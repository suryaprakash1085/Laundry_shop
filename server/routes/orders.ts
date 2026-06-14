import { RequestHandler } from "express";
import db from "../db";
import { Order, OrderItem } from "@shared/api";

export const getOrders: RequestHandler = async (req, res) => {
  try {
    const orders = await db("orders")
      .leftJoin("customers", "orders.customer_id", "customers.id")
      .select(
        "orders.*",
        "customers.name as customer_name",
        "customers.phone as customer_phone",
      )
      .orderBy("orders.id", "desc");

    res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

export const getOrderById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await db("orders")
      .leftJoin("customers", "orders.customer_id", "customers.id")
      .where("orders.id", id)
      .select(
        "orders.*",
        "customers.name as customer_name",
        "customers.phone as customer_phone",
      )
      .first();

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const items = await db("order_items")
      .leftJoin("services", "order_items.service_id", "services.id")
      .where("order_items.order_id", id)
      .select("order_items.*", "services.name as service_name");

    res.json({ ...order, items });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

export const createOrder: RequestHandler = async (req, res) => {
  try {
    const { customer_id, order_type, items, notes } = req.body;

    if (!customer_id || !order_type || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const orderNumber = `ORD-${Date.now()}`;
    const totalAmount = items.reduce(
      (sum: number, item: any) => sum + (item.subtotal || 0),
      0,
    );

    const [row] = await db("orders")
      .insert({
        order_number: orderNumber,
        customer_id,
        order_type,
        total_amount: totalAmount,
        notes: notes || null,
        status: "pending",
      })
      .returning("id");

    const orderId = row?.id ?? row;

    const orderItems = items.map((item: any) => ({
      order_id: orderId,
      service_id: item.service_id,
      quantity: item.quantity,
      price: item.price,
      subtotal: item.subtotal,
    }));

    await db("order_items").insert(orderItems);

    const order = await db("orders")
      .leftJoin("customers", "orders.customer_id", "customers.id")
      .where("orders.id", orderId)
      .select(
        "orders.*",
        "customers.name as customer_name",
        "customers.phone as customer_phone",
      )
      .first();

    res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

export const updateOrder: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes, completion_date } = req.body;

    const order = await db("orders").where("id", id).first();
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await db("orders")
      .where("id", id)
      .update({
        status: status ?? order.status,
        notes: notes ?? order.notes,
        completion_date: completion_date ?? order.completion_date,
        updated_at: db.fn.now(),
      });

    const updated = await db("orders")
      .leftJoin("customers", "orders.customer_id", "customers.id")
      .where("orders.id", id)
      .select(
        "orders.*",
        "customers.name as customer_name",
        "customers.phone as customer_phone",
      )
      .first();

    res.json(updated);
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({ error: "Failed to update order" });
  }
};

export const deleteOrder: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await db("orders").where("id", id).first();
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    await db("order_items").where("order_id", id).del();
    await db("orders").where("id", id).del();

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({ error: "Failed to delete order" });
  }
};
