const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const collaborators = await db.any("SELECT * FROM colaboradores");
    res.status(200).json(collaborators);
  } catch (error) {
    console.error("Erro ao obter colaboradores:", error);
    res.status(500).json({ error: "Erro ao obter colaboradores" });
  }
});

module.exports = router;
