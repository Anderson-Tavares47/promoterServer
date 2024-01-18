const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.get("/", validateApiKey, async (req, res) => {
  try {
    const produtos = await db.any("SELECT * FROM produtos");
    res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    res.status(500).json({ error: "Erro ao obter produtos" });
  }
});

module.exports = router;
