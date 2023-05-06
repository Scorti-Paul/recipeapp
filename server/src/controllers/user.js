import { UserModel } from "../DB/models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ message: "all fields required" });
  }

  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: "user already exists" });
  }

  const hashPass = await bcrypt.hash(password, 10);

  const newUser = await UserModel.create({
    username,
    password: hashPass,
  });
  res.status(201).json(newUser);
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "user does not exists" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.json({ message: "Username or password is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, "secret");
  res.json({ token, userId: user._id });
};

export { registerUser, loginUser };
