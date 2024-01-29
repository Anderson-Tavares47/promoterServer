const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.post("/", validateApiKey, async (req, res) => {
  const { nome_pesquisa, colaboradores_responsaveis, obrigatoriedade, status } = req.body;

  try {
    const result = await db.one(
      "INSERT INTO pesquisas (nome_pesquisa, colaboradores_responsaveis, obrigatoriedade, status) VALUES ($1, $2, $3, $4) RETURNING id",
      [nome_pesquisa, colaboradores_responsaveis, obrigatoriedade, status]
    );

    res.status(201).json({ message: "Pesquisa criada com sucesso", idPesquisa: result.id });
  } catch (error) {
    console.error("Erro ao criar pesquisa:", error);
    res.status(500).json({ error: "Erro ao criar pesquisa" });
  }
});

module.exports = router;

