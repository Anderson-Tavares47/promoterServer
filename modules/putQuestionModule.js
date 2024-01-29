const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.put("/:id", validateApiKey, async (req, res) => {
  const perguntaId = req.params.id;
  const { pergunta, tipo_pergunta, respostas, obrigatoriedade } = req.body;

  try {
    // Atualize a pergunta na tabela de perguntas
    await db.none(
      "UPDATE perguntas SET pergunta = $1, tipo_pergunta = $2, respostas = $3, obrigatoriedade = $4 WHERE id = $5",
      [pergunta, tipo_pergunta, respostas, obrigatoriedade, perguntaId]
    );

    res.status(200).json({ message: "Pergunta atualizada com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar pergunta:", error);
    res.status(500).json({ error: "Erro ao atualizar pergunta" });
  }
});

module.exports = router;
