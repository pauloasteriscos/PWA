import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";
import teachersRoutes from "./routes/teachers.routes.js";
import studentsRoutes from "./routes/students.routes.js";
import proposalsRoutes from "./routes/proposals.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: false
  })
);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/teachers", teachersRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/proposals", proposalsRoutes);

// erro simples e consistente
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    error: err.message || "Erro interno",
    details: err.details || undefined
  });
});

const PORT = process.env.PORT || 3000;

async function start() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/projetofinal";
  await mongoose.connect(uri);
  console.log("MongoDB ligado:", uri);
  app.listen(PORT, () => console.log(`API a correr em http://localhost:${PORT}`));
}

start().catch((e) => {
  console.error("Falha ao arrancar:", e);
  process.exit(1);
});
