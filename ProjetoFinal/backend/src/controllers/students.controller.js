import Student from "../models/Student.js";

export async function listStudents(_req, res, next) {
  try {
    const students = await Student.find().select("_id name number email").sort({ name: 1 });
    res.json(students.map(s => ({ id: s._id, name: s.name, number: s.number, email: s.email })));
  } catch (e) {
    next(e);
  }
}
