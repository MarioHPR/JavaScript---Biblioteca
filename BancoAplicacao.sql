CREATE DATABASE if not exists Desafio;
use Desafio;

CREATE TABLE IF NOT EXISTS LIVRO (
  numero INT NOT NULL AUTO_INCREMENT primary key,
  titulo varchar(200) NOT NULL,
  autor varchar(200) NOT NULL,
  ano varchar(4) NOT NULL,
  situacao varchar(12) NOT NULL
);

CREATE TABLE IF NOT EXISTS USUARIO (
  id INT NOT NULL AUTO_INCREMENT primary key,
  nome varchar(200) UNIQUE NOT NULL,
  senha varchar(200) NOT NULL
);

CREATE TABLE IF NOT EXISTS EMPRESTIMO (
  id INT NOT NULL AUTO_INCREMENT primary key,
  situacao INT NOT NULL,
  id_livro INT NOT NULL,
  id_usuario INT NOT NULL,
  
	FOREIGN KEY(id_livro)
		REFERENCES LIVRO(numero),
	FOREIGN KEY(id_usuario)
		REFERENCES USUARIO(id)
);

INSERT INTO LIVRO (titulo, autor, ano, situacao) 
	VALUE ("Como fazer sentido e bater o martelo","Alexandro Aolchique","2017","Disponivel"),
		  ("Código Limpo","Tio Bob","2001","Disponivel"),
          ("Basquete 101","Hortência Marcari","2010","Disponivel");