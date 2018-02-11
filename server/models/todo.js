const mongoose = require('mongoose');
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