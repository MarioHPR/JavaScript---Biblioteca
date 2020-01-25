var express   = require('express');
var router    = express.Router();
var mysql     = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/Desafio';

router.get('/', function (req, res, next) {
    
    var sql = 'SELECT DISTINCT  * from USUARIO inner join EMPRESTIMO inner join LIVRO on EMPRESTIMO.id_usuario = USUARIO.id and EMPRESTIMO.id_livro = LIVRO.numero WHERE EMPRESTIMO.situacao = -1;';

    const connection = mysql.createConnection(consMysql);
    connection.connect();
    connection.query(sql, function (error, results) {
        if (error) {
            return res.status(304).end();
        }
        console.log(results);
        return res.status(200).json(results);
    });
    connection.end();
});

router.get('/usuario', function (req, res, next) {

    var sql = 'SELECT DISTINCT  * from USUARIO inner join EMPRESTIMO inner join LIVRO on EMPRESTIMO.id_usuario = USUARIO.id and EMPRESTIMO.id_livro = LIVRO.numero WHERE EMPRESTIMO.situacao = -1 AND id_usuario = ?;';

    const connection = mysql.createConnection(consMysql);
    connection.connect();
    connection.query(sql, [req.query.idUsuario], function (error, results) {
        if (error) {
            return res.status(304).end();
        }
        console.log(results);
        return res.status(200).json(results);
    });
    connection.end();
});

router.post('/', function (req, res) {
    console.log("fiudfnweuidnwedowdmw " + req.body.idEmprestimo);

    if(req.body.situacao == -1){
        let emprestimo = [];
        emprestimo.push(req.body.situacao);
        emprestimo.push(req.body.idLivro);
        emprestimo.push(req.body.idUsuario);

        var sql = "INSERT INTO EMPRESTIMO (situacao,id_livro,id_usuario)VALUE(?,?,?)";
        const connection = mysql.createConnection(consMysql);
        connection.connect();
        connection.query(sql, emprestimo, function (error, result) {
            if (error) {
                console.log(error)
                return res.status(304).end();
            }
            console.log(result)
            return res.status(200).end();
        });
        connection.end();
    }
    else{
        let emprestimo = [];
        emprestimo.push(req.body.situacao);
        emprestimo.push(req.body.idEmprestimo);
        var sql = "UPDATE EMPRESTIMO SET situacao = ? WHERE id = ?;";
        const connection = mysql.createConnection(consMysql);
        connection.connect();
        connection.query(sql, emprestimo, function (error, result) {
            if (error) {
                console.log(error)
                return res.status(304).end();
            }
            console.log(result)
            return res.status(200).end();
        });
        connection.end();
    }
});
module.exports = router;