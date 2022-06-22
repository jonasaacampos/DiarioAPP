const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_TOKEN;

router.post('/register' , async(req, res) => {
  const {name, email, password} = req.body;
  const user = new User({name, email, password});

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error : "Erro ao registrar o usuário"});
  }

});

router.post('./login', async(req, res) => {
  const {email, password} = req.body;

  try {
    let user = await User.findOne({email});
    if(!user){
      res.status(401).json({error: 'Usuário ou senha não encontrados.'})
    } else {
      user.isCorrectPasword(password, function(err,same){
        if(!same){
          res.status(401).json({error: 'Usuário ou senha não encontrados.'})
        } else{
          const token = jwt.sign({email}, secret, {expiresIn: '10d'});
          res.json({user: user, token: token});
        }
      })
    }
  } catch (error) {
    res.status(500).json({error: "Erro interno. Tente novamente mais tarde."});
  }

})


module.exports = router;
