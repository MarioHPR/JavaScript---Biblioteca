 DROP DATABASE Desafio;
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


select * from usuario;
select * from EMPRESTIMO WHERE id_usuario = 1;
-- delete from EMPRESTIMO where id = 6;





insert into Usuario (nome, senha) 
 	value ("adm","123"),("teste","123");
insert into LIVRO (titulo, autor, ano, situacao) 
 	value ("Como fazer sentido e bater o martelo","Alexandro Aolchique","2017","Disponivel"),
		  ("Código Limpo","Tio Bob","2001","Disponivel"),
		  ("Basquete 101","Hortência Marcari","2010","Disponivel");
insert into LIVRO (titulo, autor, ano, situacao) 
 	value ("Como testar ","teste Aolchique","2020","Indisponivel"),
		  ("testar testar ","teste teste","2020","Indisponivel");
insert into EMPRESTIMO (situacao, id_livro, id_usuario) 
 	value ( -1,4,1),( -1,5,1);
    
SELECT DISTINCT  * from USUARIO inner join EMPRESTIMO inner join LIVRO
		on EMPRESTIMO.id_usuario = USUARIO.id and EMPRESTIMO.id_livro = LIVRO.numero 
        WHERE EMPRESTIMO.situacao = -1;
update EMPRESTIMO SET id_usuario = 2 WHERE id = 1;