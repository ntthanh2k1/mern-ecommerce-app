import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { createTokens } from "../utils/jwt.js";

// Register module
const register = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: `Username ${username} already exists.` });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User ({
      name,
      email,
      username,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({
      message: "Registered successfully.",
      data: newUser
    });
  } catch (error) {
    res.status(500).json({ message: `Error register module: ${error.message}.` });
  }
};

// Login module
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    const userExists = await User.findOne({ username }); 

    if (!userExists) {
      return res.status(404).json({ message: `Username ${username} is not found.` });
    }

    const isPasswordValid = await bcrypt.compare(password, userExists?.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password is not correct." });
    }

    await createTokens(res, userExists?._id);

    res.status(200).json({ message: "Logged in successfully." });
  } catch (error) {
    res.status(500).json({ message: `Error login module: ${error.message}.` });
  }
};

const logout = async (req, res) => {

};

export { register, login, logout };
