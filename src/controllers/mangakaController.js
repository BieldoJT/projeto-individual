import mangakaDAO from "../DAO/mangakaDAO.js"

class mangakaController {
  static rotas(app){
    app.get('/mangakas', mangakaController.listar)
    app.post('/mangakas', mangakaController.inserir)
    app.delete('/mangakas/:id_mangaka', mangakaController.deletar)
    app.put('/mangakas/:id_mangaka', mangakaController.atualizar)
  }

  static async listar(req, res){
    const mangaka = await mangakaDAO.listar()

    res.send(mangaka)
  }

  static async inserir(req, res){
    const manga = {
        nome_mangaka  : req.body.nome_mangaka ,
        email_mangaka  : req.body.email_mangaka  ,
        info_mangaka  : req.body.info_mangaka
    }

    const result = await mangakaDAO.inserir(manga)

    if(result.erro) {
      res.status(500).send(result)
    }

    res.send(result)
  }

  static async deletar(req, res){
    const manga = await mangakaDAO.deletar(req.params.id_mangaka )

    if(manga.erro){
        res.status(500).send('Erro ao deletar o mangaka')
    }

    res.send({mensagem: 'Mangaka removido com sucesso'})
  }

  static async atualizar(req, res){
    const mangaka = {
      nome_mangaka  : req.body.nome_mangaka ,email_mangaka  : req.body.email_mangaka  ,info_mangaka  : req.body.info_mangaka
    }

    const result = await mangakaDAO.atualizar(req.params.id_mangaka, mangaka)

    if(result.erro){
        res.status(500).send('Erro ao atualizar o mangaka')
    }

    res.send({mensagem: 'mangaka alterado com sucesso'})
  }
}

export default mangakaController