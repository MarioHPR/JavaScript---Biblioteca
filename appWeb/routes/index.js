var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/', function (req, res, next) {
  axios.post('http://localhost:3000/', {
    login: req.body.login,
    senha: req.body.senha
  }).then(function (response) {
    console.log(response.status); // ex.: { user: 'Your User'}
    if (response.status == 200) {
      console.log("foi deu gol");
      res.redirect('/');
    }
    
  }).catch(error => { 
    console.log("Não deu gol");
    res.redirect('/');
  });
});



module.exports = router;