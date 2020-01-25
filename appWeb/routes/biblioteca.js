var express = require('express');
var router  = express.Router();
var axios   = require('axios');

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
            idUsuario: 1,
            idLivro: req.body.idLivro,
            situacao: aux
        }
    ).then(function (response) {
        if (response.status == 200) {
            console.log("ID LIVROOOO: " + req.body.idLivro)
            console.log("ID situacao: " + novaSituacao)

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