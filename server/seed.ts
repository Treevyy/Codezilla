import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/User.ts";
import { Question } from "./models/Question";

dotenv.config();

await mongoose.connect(process.env.MONGODB_URI!);

// Wipe collections
await User.deleteMany({});
await Question.deleteMany({});

// Seed data
await User.create({ username: "playerOne", email: "player@example.com", password: "123456" });
await Question.insertMany([
  { prompt: "Explain closures in JavaScript", difficulty: "hard" },
  { prompt: "What is a component in React?", difficulty: "easy" }
]);

console.log("🌱 Seeding complete!");
mongoose.connection.close();
