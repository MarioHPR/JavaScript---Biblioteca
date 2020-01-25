var express = require('express');
var router  = express.Router();
var axios   = require('axios');
const session = require("express-session");

router.get('/', function (req, res, next) {
    axios.get('http://localhost:3000/biblioteca').then(function (response) {

        if (response.status == 200) {

            axios.get('http://localhost:3000/emprestimo').then(function (respon) {

                if (respon.status == 200) {
                    res.render('livro/listaLivros', { livros: response.data, livrosIndisponivel: respon.data });
                }

            }).catch(error => { console.log(error) });
        }
    }).catch(error => { console.log(error) });
});

router.get('/devolucao', function (req, res, next) {
    
    axios.get('http://localhost:3000/emprestimo/usuario', {
        params: {
            idUsuario: localStorage
        }
    }).then(function (response) {
        if (response.status == 200) {
            res.render('livro/listaLivrosRetirados', { livrosRetirados: response.data });
        }
    }).catch(error => { console.log(error) });

});

router.post('/', function (req, res, next) {

    var novaSituacao;
    var aux;
    if (req.body.situacao == "Disponivel"){
        novaSituacao = "Indisponivel";
        aux = -1;
    }   
    else{
        novaSituacao = "Disponivel";
        aux = 1;
    } 
       
    axios.post('http://localhost:3000/emprestimo',
        {
            idUsuario: localStorage,
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