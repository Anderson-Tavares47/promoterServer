const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.post("/", validateApiKey, async (req, res) => {
  const { nome, senha, geolocalizacao, cargo, admin } = req.body;

  if (!senha || typeof senha !== "string") {
    return res.status(400).json({ error: "A senha deve ser uma string válida" });
  }

  const hashedSenha = await bcrypt.hash(senha, 10);

  try {
    const values = geolocalizacao ? [nome, hashedSenha, geolocalizacao, cargo, admin] : [nome, hashedSenha, null, cargo, admin];

    await db.none(
      "INSERT INTO users (nome, senha, geolocalizacao, cargo, admin) VALUES($1, $2, $3, $4, $5)",
      values
    );

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    if (error.code === '23505' && error.constraint === 'nome_unica') {
      return res.status(409).json({ error: "Já existe um usuário com esse nome" });
    }

    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

module.exports = router;
