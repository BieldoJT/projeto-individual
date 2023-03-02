import db from '../infra/db.js'

class mangasDAO {
    static listar() {
        const query = 'SELECT * FROM mangas';
        return new Promise((resolve, reject) => {
            db.all(query, (err, rows) => {
                if (err) {
                    reject(err);
                }

                resolve(rows)
            });
        });
    }

    static inserir(manga) {
        const query = 'INSERT INTO mangas(id_mangaka,id_publisher,titulo_manga,volume,valor) VALUES(?,?,?,?,?)';
        return new Promise((resolve, reject) => {
            db.run(query, [manga.id_mangaka, manga.id_publisher, manga.titulo_manga,manga.volume,manga.valor], function (err) {
                if (err) {
                    reject({
                        mensagem: 'Erro ao inserir o conteúdo',
                        erro: err
                    })
                }

                resolve({
                    mensagem: 'manga adicionado com sucesso',
                    id_manga : this.lastID
                 })
            });
        });
    }

    static deletar(id) {
      const query = 'DELETE FROM mangas WHERE id_manga = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [id], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao deletar o manga',
                      erro: err
                  })
              }

              resolve({ mensagem: 'manga deletado com sucesso' })
          });
      });
    }

    static atualizar(id_manga , manga) {
      const query = 'UPDATE mangas SET id_mangaka   = ?, id_publisher   = ?, titulo_manga  = ?,volume =?,valor =? WHERE id_manga  = ?';
      return new Promise((resolve, reject) => {
          db.run(query, [manga.id_mangaka, manga.id_publisher, manga.titulo_manga,manga.volume,manga.valor,id_manga], (err) => {
              if (err) {
                  reject({
                      mensagem: 'Erro ao atualizar o conteúdo',
                      erro: err
                  })
              }

              resolve({ mensagem: 'manga atualizado com sucesso' })
          });
      });
    }
}

export default mangasDAO;