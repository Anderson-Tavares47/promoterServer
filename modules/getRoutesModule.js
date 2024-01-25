const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.get("/", validateApiKey, async (req, res) => {
    try {
      const rotas = await db.any("SELECT * FROM rota");
      res.status(200).json(rotas);
    } catch (error) {
      console.error("Erro ao obter rotas:", error);
      res.status(500).json({ error: "Erro ao obter rotas" });
    }
  });

module.exports = router;
