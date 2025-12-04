// Ficheiro adicionado para Tarefa 3.2 e 3.3.
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const sponsorSchema = new Schema(
  {
    name: String,
    orgType: String,
    email: String,
    phone: String,
    website: String,

    // Lista de animais patrocinados
    animals: [String],

    notes: String,

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
  CONFIG.mongodb.collections.sponsor,
  sponsorSchema
);
