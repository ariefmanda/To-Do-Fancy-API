const user = require('../models/user');
const jwt = require('jsonwebtoken');
module.exports = {
  signin:(req,res,next)=>{
    user.findOne({'email':req.fb.email})
      .then(dataU=>{
        if(dataU){
          let token = jwt.sign({dataU}, process.env.secretjwt)
          res.send({
            message:'akun sudah ada,ini cok',
            name:dataU.name,
            email:dataU.email,
            image_url:dataU.image_url,
            data:token,
          })
        }else{
          console.log('masuk else');
          user.create({
              email: req.fb.email,
              name: req.fb.name,
              image_url: req.fb.picture.data.url
            })
            .then(user =>{
              console.log('sayang');
              let token = jwt.sign({user}, process.env.secretjwt)
              res.send({
                message: 'add success',
                name:user.name,
                email:user.email,
                image_url:user.image_url,
                data:token
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
