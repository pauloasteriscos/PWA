import Teacher from "../models/Teacher.js";

export async function listTeachers(_req, res, next) {
  try {
    const teachers = await Teacher.find().select("_id name email").sort({ name: 1 });
    res.json(teachers.map(t => ({ id: t._id, name: t.name, email: t.email })));
  } catch (e) {
    next(e);
  }
}
