const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.post("/", validateApiKey, async (req, res) => {
  const { nome, marca, preco, descricao } = req.body;

  if (!nome || !preco || typeof preco !== "number") {
    return res.status(400).json({ error: "Dados inválidos para criar um produto" });
  }

  try {
    const result = await db.one(
      "INSERT INTO produtos (nome, marca, preco, descricao) VALUES($1, $2, $3, $4) RETURNING *",
      [nome, marca, preco, descricao]
    );

    res.status(201).json(result);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

module.exports = router;
