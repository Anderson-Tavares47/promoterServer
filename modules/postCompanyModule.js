const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.post("/", validateApiKey, async (req, res) => {
  const {
    razaoSocial,
    nomeFantasia,
    logradouro,
    numero,
    cidade,
    estado,
    nomeResponsavel,
    email,
    telefone,
    bairro,
    cnpj, // Adicionado o campo CNPJ
  } = req.body;

  try {
    const result = await db.one(
      "INSERT INTO empresa (razaoSocial, nomeFantasia, logradouro, numero, cidade, estado, nomeResponsavel, email, telefone, bairro, cnpj) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        razaoSocial,
        nomeFantasia,
        logradouro,
        numero,
        cidade,
        estado,
        nomeResponsavel,
        email,
        telefone,
        bairro,
        cnpj,
      ]
    );

    res.status(201).json(result);
  } catch (error) {
    console.error("Erro ao cadastrar empresa:", error);
    res.status(500).json({ error: "Erro ao cadastrar empresa" });
  }
});

module.exports = router;
