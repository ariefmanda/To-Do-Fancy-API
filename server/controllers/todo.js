const todo = require('../models/todo');
module.exports = {
  find:(req,res,next)=>{
    todo.find({
      UserId:req.decoded._id
    })
      .then(data=>{
        res.send({
          message:'masuk find by jwt',
          data
        })
      })
      .catch(err=>{
        next(err)
      })
  },
  create:(req,res,next)=>{
    todo.create({
      UserId: req.decoded._id,
      content: req.body.content,
      ceklist:0
    })
    .then(data=>{
      res.send({
        message:'masuk create by jwt',
        data,
      })
    })
    .catch(err=>{
      next(err)
    })
  },
  updateContent:(req,res,next)=>{
    todo.findByIdAndUpdate(req.params.id,{
      content:req.body.content
    },{new:true})
    .then(data=>{
      res.send({
        message:'masuk updateContent by jwt',
        data,
      })
    })
    .catch(err=>{
      next(err)
    })
  },
  updateCeklist:(req,res,next)=>{
    console.log(req.params,req.body, 'edit ceklist');
    todo.findByIdAndUpdate(req.params.id,{
      ceklist: req.body.ceklist
    },{new:true})
    .then(data=>{
      res.send({
        message:'masuk updateCeklist by jwt',
        data,
      })
    })
    .catch(err=>{
      next(err)
    })
  },
  destroy:(req,res,next)=>{
    todo.findByIdAndRemove(req.params.id)
    .then(data=>{
      res.send({
        message:'masuk delete by jwt',
        data,
      })
    })
    .catch(err=>{
      next(err)
    })
  },
}
