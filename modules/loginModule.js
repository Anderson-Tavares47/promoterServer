const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../db");
const validateApiKey = require("./validateApiKey");

router.post("/", validateApiKey, async (req, res) => {
  const { nome, senha, geolocalizacao } = req.body;

  if (!nome || !senha || typeof senha !== "string") {
    return res.status(400).json({ error: "Nome de usuário e senha são obrigatórios" });
  }

  try {
    const usuario = await db.oneOrNone("SELECT * FROM users WHERE nome = $1", nome);

    if (!usuario) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    await db.none("UPDATE users SET geolocalizacao = $1 WHERE id = $2", [geolocalizacao, usuario.id]);

    const token = gerarToken(usuario.api_key, 2);

    await db.none("UPDATE users SET token = $1 WHERE id = $2", [token, usuario.id]);

    res.status(200).json({ message: "Login bem-sucedido", token });
  } catch (error) {
    console.error("Erro ao autenticar usuário:", error);
    res.status(500).json({ error: "Erro ao autenticar usuário" });
  }
});

function gerarToken(apiKey, horasExpiracao) {
  const API_KEY_SECRET = 'tpfTech';
  return jwt.sign({ apiKey }, API_KEY_SECRET, { expiresIn: `${horasExpiracao}h` });
}

module.exports = router;
