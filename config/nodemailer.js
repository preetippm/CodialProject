const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');


//this is the path which defines how this communication is going to take place
let transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gamil.com',
    port:587,
    secure: false,
    auth : {
        user:'preetimm50@gmail.com',
        pass:'saif6699@'
    }
});

//it will define whenever we are going to send an html email and the file will be placed inside views inside mailers folder
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers',relativePath),  //mailers will carry all the html ejs template
        data,
        function(err, template){
            if(err){
                console.log('error in reading template');
                return;
            }
            mailHTML = template;

        }
        )

        return mailHTML;
}

//and finally these two properties we will export and we are going to use this where we are sending this email(from mailer)
module.exports = {
    transporter : transporter,
    renderTemplate:renderTemplate
}