const nodeMailer = require('../config/nodemailer');
//const User = require('../models/user');


//instead of writing newComment = function
//module.exports= newComment;
//we can write like below and export it just like this 
//this is another way of exporting a method

exports.newComment = (comment) =>{
    //console.log('inside newComment mailer',comment);
    let htmlString = nodeMailer.renderTemplate({comment : comment}, '/comments/new_Comment.ejs')

    nodeMailer.transporter.sendMail({
        from : 'ppmmallick679@gmail.com',
        to: comment.user.email,
        subject : "New comment publish",
        html: htmlString 
    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log('Message sent', info);
        return;
    })
}