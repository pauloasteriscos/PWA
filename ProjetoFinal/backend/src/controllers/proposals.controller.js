import mongoose from "mongoose";
import Proposal from "../models/Proposal.js";
import Teacher from "../models/Teacher.js";
import Student from "../models/Student.js";

function computeCompleteness({ title, descriptionObjectives, keywords, coorientators, students }) {
  let score = 0;
  if (title && title.trim().length >= 5) score += 25;
  if (descriptionObjectives && descriptionObjectives.trim().length >= 80) score += 35;
  if (Array.isArray(keywords) && keywords.filter(Boolean).length >= 3) score += 20;
  if (Array.isArray(coorientators) && coorientators.length > 0) score += 10;
  if (Array.isArray(students) && students.length > 0) score += 10;
  return Math.min(100, score);
}

async function validateRefs({ coorientators = [], students = [] }) {
  // validar ObjectIds
  const invalidTeacherIds = coorientators.filter(id => !mongoose.isValidObjectId(id));
  const invalidStudentIds = students.filter(id => !mongoose.isValidObjectId(id));
  if (invalidTeacherIds.length || invalidStudentIds.length) {
    const err = new Error("IDs inválidos em coorientadores/alunos");
    err.status = 400;
    err.details = { invalidTeacherIds, invalidStudentIds };
    throw err;
  }

  // validar existência
  const teachersCount = coorientators.length
    ? await Teacher.countDocuments({ _id: { $in: coorientators } })
    : 0;

  const studentsCount = students.length
    ? await Student.countDocuments({ _id: { $in: students } })
    : 0;

  if (coorientators.length && teachersCount !== coorientators.length) {
    const err = new Error("Um ou mais coorientadores não existem na base de dados");
    err.status = 400;
    throw err;
  }
  if (students.length && studentsCount !== students.length) {
    const err = new Error("Um ou mais alunos não existem na base de dados");
    err.status = 400;
    throw err;
  }
}

export async function listMine(req, res, next) {
  try {
    const mine = await Proposal.find({ orientator: req.user._id })
      .sort({ createdAt: -1 })
      .populate("orientator", "name email")
      .populate("coorientators", "name email")
      .populate("students", "name number email");

    res.json(mine);
  } catch (e) {
    next(e);
  }
}

export async function createProposal(req, res, next) {
  try {
    const { title, descriptionObjectives, coorientators, students, keywords, status } = req.body || {};

    if (!title || !descriptionObjectives) {
      return res.status(400).json({ error: "title e descriptionObjectives são obrigatórios" });
    }

    const coo = Array.isArray(coorientators) ? coorientators : [];
    const stu = Array.isArray(students) ? students : [];
    const kw = Array.isArray(keywords) ? keywords.map(k => String(k).trim()).filter(Boolean) : [];

    await validateRefs({ coorientators: coo, students: stu });

    const completenessScore = computeCompleteness({
      title,
      descriptionObjectives,
      keywords: kw,
      coorientators: coo,
      students: stu
    });

    const proposal = await Proposal.create({
      title,
      descriptionObjectives,
      orientator: req.user._id,
      coorientators: coo,
      students: stu,
      keywords: kw,
      status: status || "submetida",
      completenessScore
    });

    const populated = await Proposal.findById(proposal._id)
      .populate("orientator", "name email")
      .populate("coorientators", "name email")
      .populate("students", "name number email");

    res.status(201).json(populated);
  } catch (e) {
    next(e);
  }
}

export async function updateProposal(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "ID inválido" });

    const existing = await Proposal.findOne({ _id: id, orientator: req.user._id });
    if (!existing) return res.status(404).json({ error: "Proposta não encontrada" });

    const { title, descriptionObjectives, coorientators, students, keywords, status } = req.body || {};

    const coo = Array.isArray(coorientators) ? coorientators : existing.coorientators;
    const stu = Array.isArray(students) ? students : existing.students;
    const kw = Array.isArray(keywords)
      ? keywords.map(k => String(k).trim()).filter(Boolean)
      : existing.keywords;

    await validateRefs({ coorientators: coo, students: stu });

    const updated = {
      title: title ?? existing.title,
      descriptionObjectives: descriptionObjectives ?? existing.descriptionObjectives,
      coorientators: coo,
      students: stu,
      keywords: kw,
      status: status ?? existing.status
    };

    updated.completenessScore = computeCompleteness(updated);

    await Proposal.updateOne({ _id: id }, { $set: updated });

    const populated = await Proposal.findById(id)
      .populate("orientator", "name email")
      .populate("coorientators", "name email")
      .populate("students", "name number email");

    res.json(populated);
  } catch (e) {
    next(e);
  }
}

export async function deleteProposal(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: "ID inválido" });

    const deleted = await Proposal.findOneAndDelete({ _id: id, orientator: req.user._id });
    if (!deleted) return res.status(404).json({ error: "Proposta não encontrada" });

    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
