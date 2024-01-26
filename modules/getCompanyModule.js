const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.get("/", validateApiKey, async (req, res) => {
  try {
    const empresas = await db.any("SELECT * FROM empresa");
    res.status(200).json(empresas);
  } catch (error) {
    console.error("Erro ao obter empresas:", error);
    res.status(500).json({ error: "Erro ao obter empresas" });
  }
});

module.exports = router;
