//we created a queue
const queue = require('../config/kue');
//imported a comments mailer
const commentsMailer = require('../mailers/comments_mailer');
//then process function finally calls the mailer
queue.process('emails', function(job, done){
    console.log('emails worker is processing a job',job.data);
    commentsMailer.newComment(job.data);

    done();
 })