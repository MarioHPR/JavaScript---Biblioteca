var express = require('express');
var router  = express.Router();
var axios   = require('axios');

router.get('/', function (req, res, next) {
    res.render('livro/cadastroLivro');
});

router.post('/', function (req, res, next) {
    axios.post('http://localhost:3000/livro/add',
        {
            titulo   : req.body.titulo,
            autor    : req.body.autor,
            ano      : req.body.ano,
            situacao : "Disponivel"
        }
    ).then(function (response) {
        if (response.status == 200) {
            res.redirect('biblioteca');
        }
    }).catch(error => {
        console.log(error)
    });

});

module.exports = router;