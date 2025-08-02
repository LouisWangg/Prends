import bcrypt from "bcryptjs";
// import { generateToken } from "../utils/AuthUtil.js";
import { AppError } from "../utils/AppError.js";
import UserModel from "../models/UserModel.js";

// Register User
export const registerUser = async ({ email, password, firstName, lastName } = {}) => {
  const existingAcount = await UserModel.findOne({ where: { email } });

  if (existingAcount) {
    throw new AppError(
      `Email '${existingAcount.email}' sudah terdaftar!`,
      409,
      "DUPLICATE_EMAIL",
      "USER_ALREADY_REGISTERED"
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newAccount = await UserModel.create({ email, password: hashedPassword, firstName, lastName });

  return {
    success: true,
    firstName: newAccount.firstName,
  };
};

// Login User
export const loginUser = async ({ email, password } = {}) => {
  const user = await UserModel.findOne({ where: { email } });

  if (!user)
    throw new AppError("Email tidak ditemukan", 404, "AUTHENTICATION_EMAIL", "USER_NOT_FOUND");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    throw new AppError("Password salah", 401, "AUTHENTICATION_PASSWORD", "INVALID_PASSWORD");

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };
};

// Create user
export const insertUser = async ({ email, password, firstName, lastName } = {}) => {
  return await UserModel.create({ email, password, firstName, lastName });
};

// Get all users
export const getUsers = async () => {
  return await UserModel.findAll();
};

// Get user by Id
export const getUser = async ({ id } = {}) => {
  return await UserModel.findByPk(id);
};

// Update user
export const updateUser = async ({ id, email, firstName, lastName } = {}) => {
  return await UserModel.update(
    { email, firstName, lastName },
    { where: { userId: id } }
  );
};

// Delete user
export const deleteUser = async ({ id } = {}) => {
  return await UserModel.destroy({ where: { userId: id } });
};
