module.exports.index = function(req, res){
   return res.json(200,{
       message:"Lists of posts in version 2",
       post:[]
   })
}