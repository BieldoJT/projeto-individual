import db from '../infra/db.js'

class usuarioDAO {
    static listar() {
        const query = 'SELECT * FROM usuario';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    static inserir(usuario) {
        const query = 'INSERT INTO usuario(nome_usuario,senha_usuario,email_usuario) VALUES(?,?,?)';
        return new Promise((resolve, reject) => {
            db.run(query, [usuario.nome_usuario, usuario.senha_usuario,usuario.email_usuario], function (err) {
                if (err) {
                    reject({
                        mensagem: 'Erro ao inserir o usuario',
                        erro: err
                    })
                }

                resolve({
                    mensagem: 'usuario adicionado com sucesso',
                    id_usuario : this.lastID
                 })
            });
        });
    }

    static deletar(id) {
      const query = 'DELETE FROM usuario WHERE id_usuario = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao deletar o usuario',
                      erro: err
                  })
              }

              resolve({ mensagem: 'usuario deletado com sucesso' })
          });
      });
    }

    static atualizar(id_usuario , usuario) {
      const query = 'UPDATE usuario SET nome_usuario = ?, senha_usuario  = ?,email_usuario  =? WHERE id_usuario  = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [usuario.nome_usuario, usuario.senha_usuario, usuario.email_usuario,id_usuario], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao atualizar o usuario',
                      erro: err
                  })
              }

              resolve({ mensagem: 'usuario atualizado com sucesso' })
          });
      });
    }
}

export default usuarioDAO;