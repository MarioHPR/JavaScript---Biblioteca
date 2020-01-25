var express   = require('express');
var router    = express.Router();
var mysql     = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/Desafio';

router.post('/', function (req, res) {
    let livro = [];
    const connection = mysql.createConnection(consMysql);

    livro.push(req.body.situacao);
    livro.push(req.body.idLivro);

    var sql = "UPDATE LIVRO SET situacao = ? WHERE numero = ?";
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
    let sql = "DELETE FROM Exames WHERE id = ?";
    connection.query(sql, usuario, function (error, results) {
        if (error) {
            return res.status(304).end();
        }
        let resposta = results[0];
        return res.status(200).send(resposta);
    });
    connection.end();
});

router.put('/:id', function (req, res) {// fazer ainda tirar duvida com Prof. Carlos
    let cliente = [];
    cliente.push(req.body.nome);
    cliente.push(req.body.email);
    cliente.push(req.body.telefone);
    cliente.push(req.params.id);

    const connection = mysql.createConnection(consMysql);
    connection.query("UPDATE TABELA SET nome=? ,email=? ,telefone=? WHERE id = ?", cliente, async function (error, results) {
        if (error) {
            return res.status(304).end();
        }
        let resposta = results[0];
        return res.status(200).send(resposta);
    });
    connection.end();
});


module.exports = router;