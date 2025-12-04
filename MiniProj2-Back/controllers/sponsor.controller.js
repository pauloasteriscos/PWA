// Ficheiro adicionado para Tarefa 3.2 e 3.3.
const Sponsor = require("../models/sponsor.model");
const { validationResult } = require("express-validator");
const SponsorMessages = require("../messages/sponsor.messages");

// LISTAR TODOS
exports.get = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Sponsor.find(req.query).exec((error, sponsors) => {
    if (error) throw error;

    let message = SponsorMessages.success.s2;
    message.body = sponsors;

    return res.status(message.http).send(message);
  });
};

// OBTER UM
exports.getOne = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Sponsor.findOne({ _id: req.params.id }).exec((error, sponsor) => {
    if (error) throw error;

    if (!sponsor) {
      return res
        .status(SponsorMessages.error.e0.http)
        .send(SponsorMessages.error.e0);
    }

    let message = SponsorMessages.success.s2;
    message.body = sponsor;

    return res.status(message.http).send(message);
  });
};

// CRIAR
exports.create = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  new Sponsor({
    name: req.body.name,
    type: req.body.type,
    email: req.body.email,
    website: req.body.website,
    phone: req.body.phone,
    animals: req.body.animals,
    notes: req.body.notes
  }).save((error, sponsor) => {
    if (error) throw error;

    let message = SponsorMessages.success.s0;
    message.body = sponsor;

    return res
      .header("location", "/sponsors/" + sponsor._id)
      .status(message.http)
      .send(message);
  });
};

// ATUALIZAR
exports.update = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Sponsor.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  ).exec((error, sponsor) => {
    if (error) throw error;

    if (!sponsor) {
      return res
        .status(SponsorMessages.error.e0.http)
        .send(SponsorMessages.error.e0);
    }

    let message = SponsorMessages.success.s1;
    message.body = sponsor;

    return res.status(message.http).send(message);
  });
};

// REMOVER
exports.delete = (req, res) => {
  const errors = validationResult(req).array();
  if (errors.length > 0) return res.status(406).send(errors);

  Sponsor.deleteOne({ _id: req.params.id }, (error, result) => {
    if (error) throw error;

    if (result.deletedCount <= 0) {
      return res
        .status(SponsorMessages.error.e0.http)
        .send(SponsorMessages.error.e0);
    }

    return res
      .status(SponsorMessages.success.s3.http)
      .send(SponsorMessages.success.s3);
  });
};