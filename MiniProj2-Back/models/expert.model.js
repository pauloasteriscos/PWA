// Ficheiro adicionado para Tarefa 3.2 e 3.3.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const expertSchema = new Schema(
  {
    name: String,
    specialty: String,
    institution: String,
    email: String,
    phone: String,
    website: String,

    // Lista de animais associados ao especialista
    animals: [String],

    bio: String,

    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = global.mongoConnection.model(
  CONFIG.mongodb.collections.expert,
  expertSchema
);
