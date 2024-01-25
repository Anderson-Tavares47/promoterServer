const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.delete("/:id", validateApiKey, async (req, res) => {
    const rotaId = req.params.id;
  
    try {
      const result = await db.result("DELETE FROM rota WHERE id = $1", rotaId);
  
      if (result.rowCount === 1) {
        res.status(204).end();
      } else {
        res.status(404).json({ error: "Rota não encontrada" });
      }
    } catch (error) {
      console.error("Erro ao excluir rota:", error);
      res.status(500).json({ error: "Erro ao excluir rota" });
    }
  });

  module.exports = router;