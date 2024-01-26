const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.delete("/:id", validateApiKey, async (req, res) => {
  try {
    await db.none("DELETE FROM empresa WHERE id = $1", [req.params.id]);
    res.status(204).end();
  } catch (error) {
    console.error("Erro ao excluir empresa:", error);
    res.status(500).json({ error: "Erro ao excluir empresa" });
  }
});

module.exports = router;
