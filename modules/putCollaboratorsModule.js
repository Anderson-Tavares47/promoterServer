const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
  const { nome, email, telefone, login, senha, tipo_usuario } = req.body;
  const colaboradorId = req.params.id;

  try {
    const hashedSenha = senha ? await bcrypt.hash(senha, 10) : undefined;

    await db.none(
      "UPDATE colaboradores SET nome = $1, email = $2, telefone = $3, login = $4, senha = $5, tipo_usuario = $6 WHERE id = $7",
      [nome, email, telefone, login, hashedSenha, tipo_usuario, colaboradorId]
    );

    res.status(200).json({ message: "Colaborador atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar colaborador:", error);
    res.status(500).json({ error: "Erro ao atualizar colaborador" });
  }
});

module.exports = router;
