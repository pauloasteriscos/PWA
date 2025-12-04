// Ficheiro adicionado para Tarefa 3.2 e 3.3.
const express = require("express");
let router = express.Router();

const SponsorController = require("../controllers/sponsor.controller");
const { body, param } = require("express-validator");
const AuthController = require("../controllers/auth.controller");

// LISTAR E CRIAR
router.route("/")
    .get(
        AuthController.checkAuth,
        SponsorController.get
    )
    .post(
        AuthController.checkAuth,
        [
            body("name").isString(),
            body("email").isEmail(),
            body("phone").isString()
        ],
        SponsorController.create
    );

// OBTER / ATUALIZAR / REMOVER
router.route("/:id")
    .get(
        AuthController.checkAuth,
        [param("id").isMongoId()],
        SponsorController.getOne
    )
    .put(
        AuthController.checkAuth,
        [param("id").isMongoId()],
        SponsorController.update
    )
    .delete(
        AuthController.checkAuth,
        [param("id").isMongoId()],
        SponsorController.delete
    );

module.exports = router;