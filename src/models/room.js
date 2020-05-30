const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    messages:{
        type:[{
            fromUser:String, //user Email
            message:String  //message sent by this user
        }]
    },
    userEmails:{
        type:[String],
        required:true
    }

})

const Room = mongoose.model("Room",roomSchema)
module.exports = Room