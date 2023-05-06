import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_DB_LOCAL_URI);
    console.log(connect.connection.name, "database connected");
  } catch (err) {
    console.log(err);
  }
};
