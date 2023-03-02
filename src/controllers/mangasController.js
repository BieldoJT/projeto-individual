import mangasDAO from "../DAO/mangasDAO.js"

class mangasController {
  static rotas(app){
    app.get('/mangas', mangasController.listar)
    app.post('/mangas', mangasController.inserir)
    app.delete('/mangas/:id_manga', mangasController.deletar)
    app.put('/mangas/:id_manga', mangasController.atualizar)
  }

  static async listar(req, res){
    const mangas = await mangasDAO.listar()

    res.send(mangas)
  }

  static async inserir(req, res){
    const manga = {
      id_mangaka : req.body.id_mangaka ,
      id_publisher : req.body.id_publisher ,
      titulo_manga : req.body.titulo_manga ,
      volume : req.body.volume,
      valor: req.body.valor
    }

    const result = await mangasDAO.inserir(manga)

    if(result.erro) {
      res.status(500).send(result)
    }

    res.send(result)
  }

  static async deletar(req, res){
    const manga = await mangasDAO.deletar(req.params.id_manga)

    if(manga.erro){
        res.status(500).send('Erro ao deletar o manga')
    }

    res.send({mensagem: 'Manga removido com sucesso'})
  }

  static async atualizar(req, res){
    const manga = {
      id_mangaka : req.body.id_mangaka ,
      id_publisher : req.body.id_publisher ,
      titulo_manga : req.body.titulo_manga ,
      volume : req.body.volume,
      valor: req.body.valor
    }

    const result = await mangasDAO.atualizar(req.params.id_manga, manga)

    if(result.erro){
        res.status(500).send('Erro ao atualizar o manga')
    }

    res.send({mensagem: 'manga alterado com sucesso'})
  }
}

export default mangasController