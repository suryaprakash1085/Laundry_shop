import { RequestHandler } from "express";
import { LoginRequest, LoginResponse } from "@shared/api";

export const handleLogin: RequestHandler = (req, res) => {
  try {
    const { email, password } = req.body as LoginRequest;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: "Email and password are required",
      } as LoginResponse);
    }

    // TODO: In production, validate credentials against MySQL database
    // For now, accept any credentials for demo purposes
    // In production, use bcrypt to hash and compare passwords

    // Mock user data - replace with database query
    const mockUser = {
      id: "admin-001",
      email: email,
      name: "Admin User",
    };

    // In production, generate a proper JWT token
    const token = `token-${Date.now()}`;

    return res.json({
      success: true,
      token: token,
      user: mockUser,
    } as LoginResponse);
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    } as LoginResponse);
  }
};

export const handleLogout: RequestHandler = (req, res) => {
  // Token is stored client-side, so logout is just a client-side operation
  return res.json({
    success: true,
    message: "Logged out successfully",
  });
};
