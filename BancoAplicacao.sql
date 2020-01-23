CREATE DATABASE if not exists Desafio;
use Desafio;

CREATE TABLE IF NOT EXISTS LIVRO (
  numero INT NOT NULL AUTO_INCREMENT primary key,
  titulo varchar(200),
  autor varchar(200),
  ano date,
  situacao varchar(12)
);

CREATE TABLE IF NOT EXISTS USUARIO (
  id INT NOT NULL AUTO_INCREMENT primary key,
  nome varchar(200),
  senha varchar(200)
);

CREATE TABLE IF NOT EXISTS EMPRESTIMO (
  id INT NOT NULL AUTO_INCREMENT primary key,
  id_livro INT NOT NULL,
  id_usuario INT NOT NULL,
  
	FOREIGN KEY(id_livro)
		REFERENCES LIVRO(numero),
	FOREIGN KEY(id_usuario)
		REFERENCES USUARIO(id)
);
