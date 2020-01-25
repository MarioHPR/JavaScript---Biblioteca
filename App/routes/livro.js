var express   = require('express');
var router    = express.Router();
var mysql     = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/Desafio';

router.post('/', function (req, res) {
    let livro = [];
    livro.push(req.body.situacao);
    livro.push(req.body.idLivro);

    var sql = "UPDATE LIVRO SET situacao = ? WHERE numero = ?";

    const connection = mysql.createConnection(consMysql);
    connection.connect();
    connection.query(sql, livro, function (error, result) {
        if (error) {
            console.log(error)
            return res.status(304).end();
        }
        return res.status(200).end();
    });
    connection.end();
});
router.post('/add', function (req, res) {
    let livro = [];
    livro.push(req.body.titulo);
    livro.push(req.body.autor);
    livro.push(req.body.ano);
    livro.push(req.body.situacao);

    var sql = "INSERT INTO LIVRO (titulo, autor, ano, situacao) VALUES (?,?,?,?);";
    
    const connection = mysql.createConnection(consMysql);
    connection.connect();
    connection.query(sql, livro, function (error, result) {
        if (error) {
            console.log(error)
            return res.status(304).end();
        }
        return res.status(200).end();
    });
    connection.end();
});

router.delete('/:id', function (req, res, next) {
    let usuario = [];
    usuario.push(req.params.id);
    const connection = mysql.createConnection(consMysql);
    let sql = "DELETE FROM LIVRO WHERE numero = ?";
    connection.connect();
    connection.query(sql, usuario, function (error, results) {
        if (error) {
            return res.status(304).end();
        }
        let resposta = results[0];
        return res.status(200).send(resposta);
    });
    connection.end();
});

router.put('/:id', function (req, res) {
    let livro = [];
    livro.push(req.body.titulo);
    livro.push(req.body.autor);
    livro.push(req.body.ano);
    livro.push(req.body.situacao);
    livro.push(req.body.numero);

    let sql = "UPDATE LIVRO SET titulo=? ,autor=? ,ano=?, situacao=? WHERE numero = ?;";

    const connection = mysql.createConnection(consMysql);
    connection.connect();
    connection.query(sql, livro, async function (error, results) {
        if (error) {
            return res.status(304).end();
        }
        return res.status(200).end();
    });
    connection.end();
});


module.exports = router;