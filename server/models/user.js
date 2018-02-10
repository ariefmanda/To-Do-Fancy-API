const mongoose = require('mongoose');
// mongoose.connect(`mongodb://${process.env.dbuser}:${process.env.dbpassword}@ds227858.mlab.com:27858/arlabs`);
// mongoose.connect('mongodb://127.0.0.1:27017')
var Schema = mongoose.Schema;
var userSchema = new Schema({
    email: String,
    name: String,
    image_url : String
  });
var user = mongoose.model('user', userSchema);
module.exports = user;
