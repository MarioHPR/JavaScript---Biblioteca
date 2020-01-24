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

module.exports = router;