const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.delete("/:id", validateApiKey, async (req, res) => {
  const pesquisaId = req.params.id;

  try {
    // Exclua a pesquisa na tabela de pesquisas
    await db.none("DELETE FROM pesquisas WHERE id = $1", [pesquisaId]);

    res.status(200).json({ message: "Pesquisa excluída com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir pesquisa:", error);
    res.status(500).json({ error: "Erro ao excluir pesquisa" });
  }
});

module.exports = router;
