import jwt from "jsonwebtoken";
import redis from "../config/redis.config.js";

const createTokens = async (res, userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  const refreshToken = jwt.sign(
    { userId },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  await redis.set(`refreshToken: ${userId}`, refreshToken, "EX", 7 * 24 * 60 * 60);

  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent XSS
    sameSite: "strict", // prevent CSRF
    secure: process.env.NODE_ENV === "production",
    maxAge: 1 * 24 * 60 * 60 * 1000
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
};

export { createTokens };
