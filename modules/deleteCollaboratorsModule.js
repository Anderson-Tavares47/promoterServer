const express = require("express");
const router = express.Router();
const db = require("../db");

router.delete("/:id", async (req, res) => {
  const colaboradorId = req.params.id;

  try {
    await db.none("DELETE FROM colaboradores WHERE id = $1", [colaboradorId]);
    res.status(200).json({ message: "Colaborador excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir colaborador:", error);
    res.status(500).json({ error: "Erro ao excluir colaborador" });
  }
});

module.exports = router;
