const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.get("/", validateApiKey, async (req, res) => {
  try {
    const users = await db.any("SELECT * FROM users");
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao obter usuários:", error);
    res.status(500).json({ error: "Erro ao obter usuários" });
  }
});

module.exports = router;
