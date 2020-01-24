var express   = require('express');
var router    = express.Router();
var mysql     = require('mysql');
var consMysql = 'mysql://root:@localhost:3306/Desafio';

router.get('/', function (req, res, next) {
    
    var sql = 'SELECT DISTINCT  * from USUARIO inner join EMPRESTIMO inner join LIVRO on EMPRESTIMO.id_usuario = USUARIO.id and EMPRESTIMO.id_livro = LIVRO.numero;';

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

module.exports = router;