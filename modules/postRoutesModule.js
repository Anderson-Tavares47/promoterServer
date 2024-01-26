const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.post("/", validateApiKey, async (req, res) => {
    const novaRota = req.body;
  
    try {
      const result = await db.one("INSERT INTO rota (nome, colaborador, local, dia, horario, limite) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [novaRota.nome, novaRota.colaborador, novaRota.local, novaRota.dia, novaRota.horario, novaRota.limite]);
  
      res.status(201).json(result);
    } catch (error) {
      console.error("Erro ao criar rota:", error);
      res.status(500).json({ error: "Erro ao criar rota" });
    }
  });

module.exports = router;
