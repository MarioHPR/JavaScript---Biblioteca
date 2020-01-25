var express = require('express');
var router  = express.Router();
var axios   = require('axios');

router.get('/', function(req, res, next) {
  res.render('cadastroUsuario');
});

router.post('/', function (req, res, next) {
  axios.post('http://localhost:3000/users', {
    nome: req.body.nome,
    senha: req.body.senha
  }).then(function (response) {
    if (response.status == 200)
      res.redirect("/")
  });
  
});

module.exports = router;