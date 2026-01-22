import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";
import Proposal from "../models/Proposal.js";

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  await Promise.all([
    Teacher.deleteMany({}),
    Student.deleteMany({}),
    Proposal.deleteMany({})
  ]);

  const passwordHash = await bcrypt.hash("123456", 10);

  const teachers = await Teacher.insertMany([
    { name: "Luís Barbosa", email: "luis.barbosa@exemplo.pt", passwordHash },
    { name: "Ricardo Baptista", email: "ricardo.baptista@exemplo.pt", passwordHash }
  ]);

  const students = await Student.insertMany([
    { name: "Paulo Silva", number: "A1001", email: "paulo.silva@exemplo.pt" },
    { name: "Paulo Sousa", number: "A1002", email: "paulo.sousa@exemplo.pt" },
    { name: "Paulo Roberto", number: "A1003", email: "paulo.roberto@exemplo.pt" },
    { name: "Joao Paulo", number: "A1004", email: "joao.paulo@exemplo.pt" }
  ]);

  await Proposal.insertMany([
    {
      title: "Sistema de gestão de propostas",
      descriptionObjectives: "Aplicação web para recolha e gestão de propostas de projeto final, com autenticação e validação de referências.",
      orientator: teachers[0]._id,
      coorientators: [teachers[1]._id],
      students: [students[0]._id, students[1]._id],
      keywords: ["web", "full-stack", "pwa"],
      status: "submetida",
      completenessScore: 90
    }
  ]);

  console.log("Seed OK. Login de teste: luis.barbosa@exemplo.pt / 123456");
  console.log("Seed a usar MONGODB_URI =", process.env.MONGODB_URI);
  console.log("DB name =", mongoose.connection.name);

  await mongoose.disconnect();
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
