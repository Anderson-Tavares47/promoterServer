const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.post("/", validateApiKey, async (req, res) => {
  const { nome_pesquisa, colaboradores_responsaveis, obrigatoriedade, status, perguntas } = req.body;

  try {
    // Insira a pesquisa na tabela de pesquisas
    const result = await db.one(
      "INSERT INTO pesquisas (nome_pesquisa, colaboradores_responsaveis, obrigatoriedade, status) VALUES ($1, $2, $3, $4) RETURNING id",
      [nome_pesquisa, colaboradores_responsaveis, obrigatoriedade, status]
    );

    const idPesquisa = result.id;

    // Insira as perguntas na tabela de perguntas associadas à pesquisa
    if (perguntas && perguntas.length > 0) {
      await Promise.all(perguntas.map(async (pergunta) => {
        await db.none(
          "INSERT INTO perguntas (id_pesquisa, pergunta, tipo_pergunta, respostas, obrigatoriedade) VALUES ($1, $2, $3, $4, $5)",
          [idPesquisa, pergunta.pergunta, pergunta.tipo_pergunta, pergunta.respostas, pergunta.obrigatoriedade]
        );
      }));
    }

    res.status(201).json({ message: "Pesquisa criada com sucesso" });
  } catch (error) {
    console.error("Erro ao criar pesquisa:", error);
    res.status(500).json({ error: "Erro ao criar pesquisa" });
  }
});

module.exports = router;
