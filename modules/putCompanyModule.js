const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.put("/:id", validateApiKey, async (req, res) => {
  const empresaId = req.params.id;
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
    cnpj, // Adicionado o campo CNPJ
  } = req.body;

  try {
    const result = await db.one(
      "UPDATE empresa SET razao_social = $1, nome_fantasia = $2, logradouro = $3, numero = $4, cidade = $5, estado = $6, nome_responsavel = $7, email = $8, telefone = $9, bairro = $10, cnpj = $11 WHERE id = $12 RETURNING *",
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
        empresaId,
      ]
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao atualizar empresa:", error);
    res.status(500).json({ error: "Erro ao atualizar empresa" });
  }
});
