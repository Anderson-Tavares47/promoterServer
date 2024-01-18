const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.delete("/:id", validateApiKey, async (req, res) => {
  const produtoId = req.params.id;

  try {
    await db.none("DELETE FROM produtos WHERE id = $1", [produtoId]);
    res.status(200).json({ message: "Produto excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ error: "Erro ao excluir produto" });
  }
});

module.exports = router;
