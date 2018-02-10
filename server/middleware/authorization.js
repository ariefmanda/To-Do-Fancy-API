const jsonwebtoken = require('jsonwebtoken');
module.exports = (req,res,next)=>{
  console.log('ini middleware');
  var decode = jsonwebtoken.verify(req.headers.token, process.env.secretjwt)
  console.log(decode);
  if(decode.name!=='JsonWebTokenError'){
    req.decode=decode.dataU
    next()
  }else{
    next({
      message: 'maaf data tidak ada'
    })
  }
}
