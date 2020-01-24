var express = require('express');
var router  = express.Router();

var mysql     = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/Desafio';

/* GET home page. */
router.get('/', function (req, res, next) {
    var sql = 'SELECT id,nome_exame FROM Exames WHERE id_usuario = ?;';

    const connection = mysql.createConnection(consMysql);
    connection.connect();
    connection.query(sql, [req.query.id_usuario], function (error, results) {
        if (error) {
            return res.status(304).end();
        }
        return res.status(200).json(results);
    });
    connection.end();
});

router.get('/visu', function (req, res, next) {
    console.log("Exames visu = ");
    console.log(req.query.id_usuario);
    console.log(req.query.id_exame);
    var sql = 'SELECT * FROM Exames WHERE id_usuario = ? AND id = ?;';

    const connection = mysql.createConnection(consMysql);
    connection.connect();
    connection.query(sql, [req.query.id_usuario, req.query.id_exame], function (error, results) {
        if (error) {
            return res.status(304).end();
        }
        console.log(results);
        return res.status(200).json(results[0]);
    });
    connection.end();
});

router.post('/', function (req, res) {
    console.log(req.body);
    let usuario = [];
    const connection = mysql.createConnection(consMysql);

    usuario.push(req.body.nome);
    usuario.push(req.body.id_usuario);
    usuario.push(req.body.id_instituicao);
    usuario.push(req.body.link);
    var sql = "INSERT INTO Exames (nome_exame,id_usuario,id_instituicao,linkImage) VALUES (?,?,?,?)";
    connection.query(sql, usuario, function (error, result) {
        if (error) {
            console.log(error)
            return res.status(304).end();
        }
        let resposta = { id: result.insertId };
        console.log(resposta);
        return res.status(200).json(resposta);
    });

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
});

router.post('/', function (req, res, next) {
    let sql;
    let login = [];
    login.push(req.body.login);
    login.push(req.body.senha);
    sql = "SELECT * FROM Usuario WHERE usuario = ? AND senha = ?";
    const connection = mysql.createConnection(consMysql);
    connection.query(sql, login, function (error, results) {
        if (error) {
            console.log(error);
            return res.status(304).end();
        }
        let resposta;
        let flag;
        if (results[0]) {
            resposta = results[0];
            flag = 200;
        } else {
            resposta = results;
            flag = 314;
        }
        return res.status(flag).json(resposta).end;
    });
});
module.exports = router;