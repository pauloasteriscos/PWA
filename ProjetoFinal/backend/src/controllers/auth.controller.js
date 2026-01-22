import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Teacher from "../models/Teacher.js";

function signToken(teacherId) {
  return jwt.sign(
    { sub: teacherId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "2h" }
  );
}

export async function register(req, res, next) {
  try {
    let { name, email, password } = req.body || {};

    name = name?.trim();
    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email e password são obrigatórios" });
    }

    const exists = await Teacher.findOne({ email });
    if (exists) return res.status(409).json({ error: "Email já registado" });

    const passwordHash = await bcrypt.hash(password, 10);
    const teacher = await Teacher.create({ name, email, passwordHash });

    const token = signToken(teacher._id.toString());
    res.status(201).json({
      token,
      teacher: { id: teacher._id, name: teacher.name, email: teacher.email }
    });
  } catch (e) {
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    let { email, password } = req.body || {};

    email = email?.trim().toLowerCase();
    password = password?.trim();

    if (!email || !password) {
      return res.status(400).json({ error: "email e password são obrigatórios" });
    }

    const teacher = await Teacher.findOne({ email });
    if (!teacher) return res.status(401).json({ error: "Credenciais inválidas" });

    const ok = await bcrypt.compare(password, teacher.passwordHash);
    if (!ok) return res.status(401).json({ error: "Credenciais inválidas" });

    const token = signToken(teacher._id.toString());
    res.json({
      token,
      teacher: { id: teacher._id, name: teacher.name, email: teacher.email }
    });
  } catch (e) {
    next(e);
  }
}

