const express = require("express");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.post("/:idUsuario/:idPesquisa", validateApiKey, async (req, res) => {
  const idUsuario = req.params.idUsuario;
  const idPesquisa = req.params.idPesquisa;

  try {
    await db.none(
      "INSERT INTO usuarios_pesquisas (id_usuario, id_pesquisa) VALUES ($1, $2)",
      [idUsuario, idPesquisa]
    );

    res.status(200).json({ message: "Usuário associado à pesquisa com sucesso" });
  } catch (error) {
    console.error("Erro ao associar usuário à pesquisa:", error);
    res.status(500).json({ error: "Erro ao associar usuário à pesquisa" });
  }
});

module.exports = router;
