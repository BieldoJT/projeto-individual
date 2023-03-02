import db from '../infra/db.js'

class mangakaDAO {
    static listar() {
        const query = 'SELECT * FROM mangaka';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    static inserir(mangaka) {
        const query = 'INSERT INTO mangaka(nome_mangaka,email_mangaka,info_mangaka) VALUES(?,?,?)';
        return new Promise((resolve, reject) => {
            db.run(query, [mangaka.nome_mangaka, mangaka.email_mangaka,mangaka.info_mangaka], function (err) {
                if (err) {
                    reject({
                        mensagem: 'Erro ao inserir o mangaka',
                        erro: err
                    })
                }

                resolve({
                    mensagem: 'mangaka adicionado com sucesso',
                    id_mangaka : this.lastID
                 })
            });
        });
    }

    static deletar(id) {
      const query = 'DELETE FROM mangaka WHERE id_mangaka = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao deletar o mangaka',
                      erro: err
                  })
              }

              resolve({ mensagem: 'mangaka deletado com sucesso' })
          });
      });
    }

    static atualizar(id_mangaka , mangaka) {
      const query = 'UPDATE mangaka SET nome_mangaka = ?, email_mangaka  = ?,info_mangaka  =? WHERE id_mangaka  = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [mangaka.nome_mangaka, mangaka.email_mangaka, mangaka.info_mangaka,id_mangaka], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao atualizar o mangaka',
                      erro: err
                  })
              }

              resolve({ mensagem: 'mangaka atualizado com sucesso' })
          });
      });
    }
}

export default mangakaDAO;