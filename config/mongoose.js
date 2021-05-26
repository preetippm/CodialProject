const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codial_development');

const db = mongoose.connection;

db.on('error',console.error.bind('Getting error connecting to the database'));

db.once('open',function(){
    console.log('Connected to database:: MongoDB');
});

module.exports = db;