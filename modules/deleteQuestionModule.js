const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.delete("/:id", validateApiKey, async (req, res) => {
  const perguntaId = req.params.id;

  try {
    // Exclua a pergunta na tabela de perguntas
    await db.none("DELETE FROM perguntas WHERE id = $1", [perguntaId]);

    res.status(200).json({ message: "Pergunta excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir pergunta:", error);
    res.status(500).json({ error: "Erro ao excluir pergunta" });
  }
});

module.exports = router;
