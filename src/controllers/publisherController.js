import publisherDAO from "../DAO/publisherDAO.js"

class publisherController {
  static rotas(app){
    app.get('/publishers', publisherController.listar)
    app.post('/publishers', publisherController.inserir)
    app.delete('/publishers/:id_publisher', publisherController.deletar)
    app.put('/publishers/:id_publisher', publisherController.atualizar)
  }

  static async listar(req, res){
    const publisher = await publisherDAO.listar()

    res.send(publisher)
  }

  static async inserir(req, res){
    const manga = {
        nome_publisher  : req.body.nome_publisher ,
        email_publisher  : req.body.email_publisher  ,
        info_publisher  : req.body.info_publisher
    }

    const result = await publisherDAO.inserir(manga)

    if(result.erro) {
      res.status(500).send(result)
    }

    res.send(result)
  }

  static async deletar(req, res){
    const manga = await publisherDAO.deletar(req.params.id_publisher )

    if(manga.erro){
        res.status(500).send('Erro ao deletar o publisher')
    }

    res.send({mensagem: 'publisher removido com sucesso'})
  }

  static async atualizar(req, res){
    const publisher = {
      nome_publisher  : req.body.nome_publisher ,email_publisher  : req.body.email_publisher  ,info_publisher  : req.body.info_publisher
    }

    const result = await publisherDAO.atualizar(req.params.id_publisher, publisher)

    if(result.erro){
        res.status(500).send('Erro ao atualizar o publisher')
    }

    res.send({mensagem: 'publisher alterado com sucesso'})
  }
}

export default publisherController