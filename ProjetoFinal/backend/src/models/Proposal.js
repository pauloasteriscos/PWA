import mongoose from "mongoose";

const ProposalSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    descriptionObjectives: { type: String, required: true, trim: true },

    // orientador é sempre o docente autenticado (owner)
    orientator: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },

    coorientators: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    keywords: [{ type: String, trim: true }],

    // extensões opcionais
    status: { type: String, enum: ["rascunho", "submetida", "em_analise"], default: "submetida" },
    completenessScore: { type: Number, min: 0, max: 100, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Proposal", ProposalSchema);
