/*
Esse arquivo deve ser executado apenas uma vez para que a o banco seja criado e populado
*/
import db from "./db.js";

//==== Conteúdos
const TABELA_SCHEMA = `

  CREATE TABLE IF NOT EXISTS 'mangas' (
    'id_manga' int PRIMARY KEY AUTOINCREMENT,
    'id_mangaka' int,
    'id_publisher' int,
    'titulo_manga' varchar(64),
    'volume' int,
    'valor' int
  );
  
  CREATE TABLE IF NOT EXISTS 'mangaka' (
    'id_mangaka' int PRIMARY KEY AUTOINCREMENT,
    'nome_mangaka' varchar(64),
    'email_mangaka' varchar(64),
    'info_mangaka' varchar(255)
  );
  
  CREATE TABLE IF NOT EXISTS 'publisher' (
    'id_publisher' int PRIMARY KEY AUTOINCREMENT,
    'nome_publisher' varchar(32),
    'email_publisher' varchar(32)
  );
  
  CREATE TABLE IF NOT EXISTS 'usuario' (
    'id_usuario' int PRIMARY KEY AUTOINCREMENT,
    'nome_usuario' varchar(32),
    'senha_usuario' varcher(32),
    'email_usuario' varchar(64)
  );
  `;

function createTableTABELA() {
    db.run(TABELA_SCHEMA, (error)=> {
       if (error) console.log("Erro ao criar tabela de conteúdos");
    });
}

db.serialize( ()=> {
    createTableTABELA();
});