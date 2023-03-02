import usuarioDAO from "../DAO/usuarioDAO.js"

class usuarioController {
  static rotas(app){
    app.get('/usuarios', usuarioController.listar)
    app.post('/usuarios', usuarioController.inserir)
    app.delete('/usuarios/:id_usuario', usuarioController.deletar)
    app.put('/usuarios/:id_usuario', usuarioController.atualizar)
  }

  static async listar(req, res){
    const usuario = await usuarioDAO.listar()

    res.send(usuario)
  }

  static async inserir(req, res){
    const manga = {
        nome_usuario  : req.body.nome_usuario ,
        senha_usuario  : req.body.senha_usuario  ,
        email_usuario  : req.body.email_usuario
    }

    const result = await usuarioDAO.inserir(manga)

    if(result.erro) {
      res.status(500).send(result)
    }

    res.send(result)
  }

  static async deletar(req, res){
    const manga = await usuarioDAO.deletar(req.params.id_usuario )

    if(manga.erro){
        res.status(500).send('Erro ao deletar o usuario')
    }

    res.send({mensagem: 'usuario removido com sucesso'})
  }

  static async atualizar(req, res){
    const usuario = {
      nome_usuario  : req.body.nome_usuario ,
      senha_usuario  : req.body.senha_usuario  ,
      email_usuario  : req.body.email_usuario
    }

    const result = await usuarioDAO.atualizar(req.params.id_usuario, usuario)

    if(result.erro){
        res.status(500).send('Erro ao atualizar o usuario')
    }

    res.send({mensagem: 'usuario alterado com sucesso'})
  }
}

export default usuarioController