const User = require('../models/user');
const jwt = require('jsonwebtoken');
module.exports = {
  signin:(req,res,next)=>{
    User.findOne({'email':req.fb.email})
      .then(user=>{
        if(user){
          let token = jwt.sign({user}, process.env.secretjwt)
          res.send({
            message:'akun sudah ada',
            name:user.name,
            email:user.email,
            image_url:user.image_url,
            token:token,
          })
        }else{
          User.create({
              email: req.fb.email,
              name: req.fb.name,
              image_url: req.fb.picture.data.url
            })
            .then(userCreate =>{
              user=userCreate
              let token = jwt.sign({user}, process.env.secretjwt)
              res.send({
                message: 'add success',
                name:user.name,
                email:user.email,
                image_url:user.image_url,
                token:token
              })
            })
            .catch(err => {
              next(err)
            })
        }
      })
      .catch(err => {
        next(err)
      })
  }
}
