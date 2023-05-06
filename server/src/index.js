import express from "express";
import cors from "cors";
import "dotenv/config";
import { userRouter } from "./routes/user.js";
import { recipeRouter } from "./routes/recipe.js";
import { connectDB } from "./DB/dbConnection.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/recipes", recipeRouter);

connectDB();

app.listen(3001, () => {
  console.log("SERVER STARTED...");
});
