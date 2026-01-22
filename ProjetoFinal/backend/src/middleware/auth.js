import jwt from "jsonwebtoken";
import Teacher from "../models/Teacher.js";

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const [, token] = header.split(" ");
    if (!token) return res.status(401).json({ error: "Token em falta" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const teacher = await Teacher.findById(payload.sub).select("_id name email");
    if (!teacher) return res.status(401).json({ error: "Utilizador inválido" });

    req.user = teacher;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Não autorizado" });
  }
}
