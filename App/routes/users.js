var express   = require('express');
var router    = express.Router();
var mysql     = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/Desafio';

router.post('/', function (req, res, next) {
  let usuario = [];
  let sql;
  usuario.push(req.body.nome);
  usuario.push(req.body.senha);
  const connection = mysql.createConnection(consMysql);
  sql = "INSERT INTO USUARIO (nome,senha) VALUES (?,?)";
  connection.query(sql, usuario, function (error, result) {
    if (error) {
      console.log(error)
      return res.status(304).end();
    }
    let resposta = { id: result.insertId };
    return res.status(200).location('http://').json(resposta);
  });
});

module.exports = router;
