router.post("/:idPesquisa", validateApiKey, async (req, res) => {
  const idPesquisa = req.params.idPesquisa;
  const perguntas = req.body;
  
  try {
    if (perguntas && perguntas.length > 0) {
      await Promise.all(perguntas.map(async (pergunta) => {
        await db.one(
          "INSERT INTO perguntas (id_pesquisa, pergunta, tipo_pergunta, respostas, obrigatoriedade) VALUES ($1, $2, $3, $4, $5) RETURNING *",
          [idPesquisa, pergunta.pergunta, pergunta.tipo_pergunta, pergunta.respostas, pergunta.obrigatoriedade]
        );
      }));
    }

    res.status(201).json({ message: "Perguntas associadas à pesquisa criadas com sucesso" });
  } catch (error) {
    console.error("Erro ao criar perguntas associadas à pesquisa:", error);
    res.status(500).json({ error: "Erro ao criar perguntas associadas à pesquisa" });
  }
});

