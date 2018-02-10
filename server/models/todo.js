const mongoose = require('mongoose');
// mongoose.connect(`mongodb://${process.env.dbuser}:${process.env.dbpassword}@ds227858.mlab.com:27858/arlabs`,(err)=>{
//   console.log(err);
// });
// mongoose.connect('mongodb://localhost:27017')
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    UserId: { type: Schema.Types.ObjectId, ref: 'user' },
    content: String,
    ceklist: Number,
  },{
    timestamps: true
  });
var todo = mongoose.model('todo', todoSchema);
module.exports = todo;
