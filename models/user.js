//require the library
const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

//creating scema for the task
const  userSchema = new mongoose.Schema({
    email: {
        type:String,
        require:true,
        unique:true
    },
    password: {
        type:String,
        require:true
    },
    name: {
        type:String,
        require:true
        },

    avatar: {
            type:String
        },

    friendship: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'Friendship'
                }
            ]
        },{
            timestamps:true

    });

    let storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname,'..',AVATAR_PATH));
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now());
        }
      });

      //static methods
      userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
      userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model('User',userSchema);

module.exports = User;

