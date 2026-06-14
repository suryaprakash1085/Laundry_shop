import { RequestHandler } from "express";
import db from "../db";
import { DailyReport, MonthlyReport } from "@shared/api";

export const getDailyReport: RequestHandler = async (req, res) => {
  try {
    const { date } = req.query;
    const reportDate =
      (date as string) || new Date().toISOString().split("T")[0];

    const orders = await db("orders")
      .where(db.raw(`DATE(created_at) = ?`, [reportDate]))
      .select("*");

    const totalOrders = orders.length;
    const completedOrders = orders.filter(
      (o) => o.status === "delivered",
    ).length;
    const totalRevenue = orders.reduce(
      (sum, o) => sum + parseFloat(o.total_amount || 0),
      0,
    );

    const report = {
      date: reportDate,
      totalOrders,
      completedOrders,
      totalRevenue,
    };

    res.json(report);
  } catch (error) {
    console.error("Get daily report error:", error);
    res.status(500).json({ error: "Failed to fetch daily report" });
  }
};

export const getMonthlyReport: RequestHandler = async (req, res) => {
  try {
    const { month, year } = req.query;
    const currentYear = year
      ? parseInt(year as string)
      : new Date().getFullYear();
    const currentMonth = month
      ? parseInt(month as string)
      : new Date().getMonth() + 1;

    const orders = await db("orders")
      .where(
        db.raw(
          `EXTRACT(YEAR FROM created_at) = ? AND EXTRACT(MONTH FROM created_at) = ?`,
          [currentYear, currentMonth],
        ),
      )
      .select("*");

    const totalOrders = orders.length;
    const completedOrders = orders.filter(
      (o) => o.status === "delivered",
    ).length;
    const totalRevenue = orders.reduce(
      (sum, o) => sum + parseFloat(o.total_amount || 0),
      0,
    );
    const totalExpenses = 0;

    const report = {
      month: new Date(currentYear, currentMonth - 1).toLocaleString("en-US", {
        month: "long",
      }),
      year: currentYear,
      totalOrders,
      completedOrders,
      totalRevenue,
      totalExpenses,
      profit: totalRevenue - totalExpenses,
    };

    res.json(report);
  } catch (error) {
    console.error("Get monthly report error:", error);
    res.status(500).json({ error: "Failed to fetch monthly report" });
  }
};

export const getOrderSummary: RequestHandler = async (req, res) => {
  try {
    const orders = await db("orders").select("*");

    const summary = {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing").length,
      ready: orders.filter((o) => o.status === "ready").length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      totalRevenue: orders.reduce(
        (sum, o) => sum + parseFloat(o.total_amount || 0),
        0,
      ),
    };

    res.json(summary);
  } catch (error) {
    console.error("Get order summary error:", error);
    res.status(500).json({ error: "Failed to fetch order summary" });
  }
};
