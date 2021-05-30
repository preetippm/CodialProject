module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('User_id',238940);
    return res.render('home',{
        title: 'home'
    });

}