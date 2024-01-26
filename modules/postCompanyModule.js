const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.post("/", validateApiKey, async (req, res) => {
  try {
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
      bairro
    } = req.body;

    const newEmpresa = await db.one(
      `INSERT INTO empresa (razaoSocial, nomeFantasia, logradouro, numero, cidade, estado, nomeResponsavel, email, telefone, bairro) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [razaoSocial, nomeFantasia, logradouro, numero, cidade, estado, nomeResponsavel, email, telefone, bairro]
    );

    res.status(201).json(newEmpresa);
  } catch (error) {
    console.error("Erro ao criar empresa:", error);
    res.status(500).json({ error: "Erro ao criar empresa" });
  }
});

module.exports = router;
