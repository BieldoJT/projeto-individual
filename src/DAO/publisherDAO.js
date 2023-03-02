import db from '../infra/db.js'

class publisherDAO {
    static listar() {
        const query = 'SELECT * FROM publisher';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    static inserir(publisher) {
        const query = 'INSERT INTO publisher(nome_publisher,email_publisher,info_publisher) VALUES(?,?,?)';
        return new Promise((resolve, reject) => {
            db.run(query, [publisher.nome_publisher, publisher.email_publisher,publisher.info_publisher], function (err) {
                if (err) {
                    reject({
                        mensagem: 'Erro ao inserir o publisher',
                        erro: err
                    })
                }

                resolve({
                    mensagem: 'publisher adicionado com sucesso',
                    id_publisher : this.lastID
                 })
            });
        });
    }

    static deletar(id) {
      const query = 'DELETE FROM publisher WHERE id_publisher = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao deletar o publisher',
                      erro: err
                  })
              }

              resolve({ mensagem: 'publisher deletado com sucesso' })
          });
      });
    }

    static atualizar(id_publisher , publisher) {
      const query = 'UPDATE publisher SET nome_publisher = ?, email_publisher  = ?,info_publisher  =? WHERE id_publisher  = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [publisher.nome_publisher, publisher.email_publisher, publisher.info_publisher,id_publisher], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao atualizar o publisher',
                      erro: err
                  })
              }

              resolve({ mensagem: 'publisher atualizado com sucesso' })
          });
      });
    }
}

export default publisherDAO;