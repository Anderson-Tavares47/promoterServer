const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.put("/:id", validateApiKey, async (req, res) => {
  const pesquisaId = req.params.id;
  const { nome_pesquisa, colaboradores_responsaveis, obrigatoriedade, status } = req.body;

  try {
    // Atualize a pesquisa na tabela de pesquisas
    await db.none(
      "UPDATE pesquisas SET nome_pesquisa = $1, colaboradores_responsaveis = $2, obrigatoriedade = $3, status = $4 WHERE id = $5",
      [nome_pesquisa, colaboradores_responsaveis, obrigatoriedade, status, pesquisaId]
    );

    res.status(200).json({ message: "Pesquisa atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar pesquisa:", error);
    res.status(500).json({ error: "Erro ao atualizar pesquisa" });
  }
});

module.exports = router;
