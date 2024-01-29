const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.post("/:idPesquisa", validateApiKey, async (req, res) => {
  const idPesquisa = req.params.idPesquisa;
  const {
    id_pesquisa, pergunta, tipo_pergunta, respostas, obrigatoriedade
  } = req.body;

  try {
    const result = await db.one(
      "INSERT INTO perguntas (id_pesquisa, pergunta, tipo_pergunta, respostas, obrigatoriedade) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        idPesquisa, pergunta, tipo_pergunta, respostas, obrigatoriedade
      ]
    );

    res.status(201).json(result);
  } catch (error) {
    console.error("Erro ao cadastrar empresa:", error);
    res.status(500).json({ error: "Erro ao cadastrar empresa" });
  }
});

module.exports = router;
