var FB = require('fb')
function find(req,res,next) {
  FB.setAccessToken(req.headers.fbtoken);
  FB.api('/me', {
    fields: ['name', 'email', 'picture', 'age_range']
  }, 'GET',function(response) {
    console.log('ini middleware');
    if (!response || response.error) {
      console.log('ini middleware',response.error);
      next(response.error)
    }else{
      req.fb=response
      next()
    }
  });
}
module.exports = find
