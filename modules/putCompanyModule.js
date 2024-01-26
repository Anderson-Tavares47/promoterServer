const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.put("/:id", validateApiKey, async (req, res) => {
  try {
    const {
      razaoSocial,
      nomeFantasia,
      logradouro,
      numero,
      cidade,
      estado,
      nomeResponsavel,
      email,
      telefone,
      bairro,
      cnpj
    } = req.body;

    const updatedEmpresa = await db.one(
      `UPDATE empresa 
       SET razaoSocial = $1, nomeFantasia = $2, logradouro = $3, numero = $4, cidade = $5, estado = $6, 
           nomeResponsavel = $7, email = $8, telefone = $9, bairro = $10
       WHERE id = $11
       RETURNING *`,
      [
        razaoSocial,
        nomeFantasia,
        logradouro,
        numero,
        cidade,
        estado,
        nomeResponsavel,
        email,
        telefone,
        bairro,
        cnpj,
        req.params.id
      ]
    );

    res.status(200).json(updatedEmpresa);
  } catch (error) {
    console.error("Erro ao atualizar empresa:", error);
    res.status(500).json({ error: "Erro ao atualizar empresa" });
  }
});

module.exports = router;
