import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh_secret_key";

// Generate a new JWT with payload (e.g. { id, email })
export const generateToken = (payload, expiresIn = "4h") => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

export const generateRefreshToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn });
};

// Verify a token and return the decoded payload
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_SECRET);
};
