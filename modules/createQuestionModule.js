const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.post("/:idPesquisa", validateApiKey, async (req, res) => {
  const idPesquisa = req.params.idPesquisa;
  const perguntas = req.body;
  
  try {
    if (perguntas && perguntas.length > 0) {
      await Promise.all(perguntas.map(async (pergunta) => {
        await db.oneOrNone(
          "INSERT INTO perguntas (id_pesquisa, pergunta, tipo_pergunta, respostas, obrigatoriedade) VALUES ($1, $2, $3, $4, $5)",
          [
            String(idPesquisa),
            String(pergunta.pergunta),
            String(pergunta.tipo_pergunta),
            String(pergunta.respostas),
            String(pergunta.obrigatoriedade)
          ]
        );
      }));
    }

    res.status(201).json({ message: "Perguntas associadas à pesquisa criadas com sucesso" });
  } catch (error) {
    console.error("Erro ao criar perguntas associadas à pesquisa:", error);
    res.status(500).json({ error: "Erro ao criar perguntas associadas à pesquisa" });
  }
});

module.exports = router;

