import { generateToken, verifyRefreshToken } from "../utils/AuthUtil.js";
import * as UserService from "../services/UserService.js";

// Register User
export const registerUser = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const result = await UserService.registerUser({ email, password, firstName, lastName });

    return res.status(201).json({
      success: true,
      message: `Pengguna baru berhasil didaftarkan : ${result.firstName}`
    });
  } catch (error) {
    next(error);
  }
};

// Login User
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await UserService.loginUser({ email, password });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: `Login berhasil`,
      user,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status(401).json({ message: "Missing refresh token" });

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const newAccessToken = generateToken({ id: decoded.id, email: decoded.email });
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  });
  return res.status(200).json({ message: "Logout successful" });
};

// Create user
export const insertUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const data = await UserService.insertUser({ email, password, firstName, lastName });
    res.json(`New user has been successfully added: ${data.firstName}`);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    const datas = await UserService.getUsers();
    res.json(datas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Get user by Id
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await UserService.getUser({ id });

    if (!data) return res.status(404).send("User not found");
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, firstName, lastName } = req.body;

    const [data] = await UserService.updateUser({ id, email, firstName, lastName });

    if (!data) return res.status(404).send("User not found");
    res.json(`User ${id} has been successfully updated`);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await UserService.deleteUser({ id });

    if (!data) return res.status(404).send("User not found");
    res.json("User has been successfully deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
