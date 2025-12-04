// Ficheiro adicionado para Tarefa 3.2 e 3.3.
const express = require("express");
let router = express.Router();

const ExpertController = require("../controllers/expert.controller");
const { body, param } = require("express-validator");
const AuthController = require("../controllers/auth.controller");

// LISTAR E CRIAR
router.route("/")
    .get(
        AuthController.checkAuth,
        ExpertController.get
    )
    .post(
        AuthController.checkAuth,
        [
            body("name").isString(),
            body("email").isEmail(),
            body("phone").isString()
        ],
        ExpertController.create
    );

// OBTER / ATUALIZAR / REMOVER UM ESPECIALISTA
router.route("/:id")
    .get(
        AuthController.checkAuth,
        [param("id").isMongoId()],
        ExpertController.getOne
    )
    .put(
        AuthController.checkAuth,
        [param("id").isMongoId()],
        ExpertController.update
    )
    .delete(
        AuthController.checkAuth,
        [param("id").isMongoId()],
        ExpertController.delete
    );

module.exports = router;
