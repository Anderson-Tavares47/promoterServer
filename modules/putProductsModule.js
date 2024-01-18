const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.put("/:id", validateApiKey, async (req, res) => {
  const { nome, marca, preco, descricao } = req.body;
  const produtoId = req.params.id;

  try {
    await db.none(
      "UPDATE produtos SET nome = $1, marca = $2, preco = $3, descricao = $4 WHERE id = $5",
      [nome, marca, preco, descricao, produtoId]
    );

    res.status(200).json({ message: "Produto atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
});

module.exports = router;
