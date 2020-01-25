var express = require('express');
var router  = express.Router();
var axios   = require('axios');

router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/', function (req, res, next) {
  axios.post('http://localhost:3000/', {
    login: req.body.login,
    senha: req.body.senha
  }).then(function (response) {
    if (response.status == 200) {
      res.redirect('biblioteca');
    }
  }).catch(error => { 
    res.redirect('/');
  });
});



module.exports = router;