var express   = require('express');
var router    = express.Router();
var axios     = require('axios');
const session = require("express-session");
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/', function (req, res, next) {
  axios.post('http://localhost:3000/', {
    login: req.body.login,
    senha: req.body.senha
  }).then(function (response) {
    if (response.status == 200) {
      localStorage = response.data.id;
      res.redirect('biblioteca');
    }
  }).catch(error => { 
    res.redirect('/');
  });
});



module.exports = router;