var express = require('express');
var router  = express.Router();
var axios   = require('axios');

router.get('/', function (req, res, next) {
    res.render('livro/cadastroLivro');
});

router.post('/', function (req, res, next) {

    var novaSituacao;
    var aux;
    if (req.body.situacao == "Disponivel") {
        novaSituacao = "Indisponivel";
        aux = -1;
    }
    else {
        novaSituacao = "Disponivel";
        aux = 1;
    }

    axios.post('http://localhost:3000/emprestimo',
        {
            idUsuario: 1,
            idLivro: req.body.idLivro,
            situacao: aux,
            idEmprestimo: req.body.idEmprestimo
        }
    ).then(function (response) {
        if (response.status == 200) {
            axios.post('http://localhost:3000/livro',
                {
                    idLivro: req.body.idLivro,
                    situacao: novaSituacao
                }
            ).then(function (response) {
                if (response.status == 200) {
                    res.redirect('biblioteca');
                }
            }).catch(error => {
                console.log(error)
            });
        }
    }).catch(error => {
        console.log(error)
    });

});

module.exports = router;