const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.put("/:id", validateApiKey, async (req, res) => {
    const rotaId = req.params.id;
    const dadosAtualizados = req.body;
  
    try {
      const result = await db.oneOrNone("UPDATE rota SET nome = $1, colaborador = $2, local = $3, dia = $4, horario = $5, limite = $6 WHERE id = $7 RETURNING *",
        [dadosAtualizados.nome, dadosAtualizados.colaborador, dadosAtualizados.local, dadosAtualizados.dia, dadosAtualizados.horario, dadosAtualizados.limite, rotaId]);
  
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ error: "Rota não encontrada" });
      }
    } catch (error) {
      console.error("Erro ao atualizar rota:", error);
      res.status(500).json({ error: "Erro ao atualizar rota" });
    }
  });

  module.exports = router;