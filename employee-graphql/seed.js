import { connectDB } from "./db.js";
import { ObjectId } from "mongodb";

async function seed() {
  const db = await connectDB();
  const employees = [
    { name: "Alice", position: "Developer", department: "IT", salary: 50000 },
    { name: "Bob", position: "Manager", department: "HR", salary: 60000 },
    { name: "Charlie", position: "Analyst", department: "Finance", salary: 55000 },
    { name: "Diana", position: "Designer", department: "IT", salary: 48000 },
    { name: "Eve", position: "Recruiter", department: "HR", salary: 52000 },
  ];

  await db.collection("employees").deleteMany({});
  await db.collection("employees").insertMany(employees);

  console.log("Seeded initial data ✅");
  process.exit();
}

seed();
