const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const { nome, email, telefone, login, senha, tipo_usuario } = req.body;

  if (!senha || typeof senha !== "string") {
    return res
      .status(400)
      .json({ error: "A senha deve ser uma string válida" });
  }

  const hashedSenha = await bcrypt.hash(senha, 10);

  try {
    await db.none(
      "INSERT INTO colaboradores (nome, email, telefone, login, senha, tipo_usuario) VALUES($1, $2, $3, $4, $5, $6)",
      [nome, email, telefone, login, hashedSenha, tipo_usuario]
    );

    res.status(201).json({ message: "Colaborador criado com sucesso" });
  } catch (error) {
    if (error.code === '23505' && error.constraint === 'email_unico') {
      return res.status(409).json({ error: "Já existe um colaborador com esse e-mail" });
    }

    console.error("Erro ao criar colaborador:", error);
    res.status(500).json({ error: "Erro ao criar colaborador" });
  }
});

module.exports = router;
