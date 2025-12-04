// Ficheiro adicionado para Tarefa 3.2 e 3.3.
const Expert = require("../models/expert.model");
const { validationResult } = require("express-validator");
const ExpertMessages = require("../messages/expert.messages");

// LISTAR
exports.get = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Expert.find(req.query).exec((error, experts) => {
    if (error) throw error;

    let message = ExpertMessages.success.s2;
    message.body = experts;

    return res.status(message.http).send(message);
  });
};

// OBTER UM
exports.getOne = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Expert.findOne({ _id: req.params.id }).exec((error, expert) => {
    if (error) throw error;
    if (!expert) {
      return res
        .status(ExpertMessages.error.e0.http)
        .send(ExpertMessages.error.e0);
    }

    let message = ExpertMessages.success.s2;
    message.body = expert;

    return res.status(message.http).send(message);
  });
};

// CRIAR
exports.create = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  new Expert({
    name: req.body.name,
    specialty: req.body.specialty,
    institution: req.body.institution,
    email: req.body.email,
    website: req.body.website,
    animals: req.body.animals,
    notes: req.body.notes
  }).save((error, expert) => {
    if (error) throw error;

    let message = ExpertMessages.success.s0;
    message.body = expert;

    return res
      .header("location", "/experts/" + expert._id)
      .status(message.http)
      .send(message);
  });
};

// ATUALIZAR
exports.update = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Expert.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((error, expert) => {
    if (error) throw error;
    if (!expert) {
      return res
        .status(ExpertMessages.error.e0.http)
        .send(ExpertMessages.error.e0);
    }

    let message = ExpertMessages.success.s1;
    message.body = expert;

    return res.status(message.http).send(message);
  });
};

// REMOVER
exports.delete = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Expert.deleteOne({ _id: req.params.id }, (error, result) => {
    if (error) throw error;

    if (result.deletedCount <= 0) {
      return res
        .status(ExpertMessages.error.e0.http)
        .send(ExpertMessages.error.e0);
    }

    return res
      .status(ExpertMessages.success.s3.http)
      .send(ExpertMessages.success.s3);
  });
};
