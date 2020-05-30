const mongoose = require('mongoose')
const validator = require('validator')
const Room = require('../models/room')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    }
    ,name:{
        type:String,
        required:true,
        trim:true,

    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:7
    },
    avatar:{
        type:Buffer
    },
    roomsIds:{
        type:[String]
    },
})
userSchema.statics.checkUserExist = async(email)=>{
    const user = await User.findOne({email});
    if(!user) throw new Error('User not found in Database!')
    return user;
}
userSchema.statics.findByCredintials = async(email,password)=>{

    const user = await User.findOne({email,password})
    if(!user) throw new Error('User not found in Database!')
    return user

}
userSchema.statics.filterExistingUsers = async(userEmails)=>{
    newUserEmails = [];
    await Promise.all(userEmails.map(async(el)=>{
        const user = await User.findOne({email:el})
        if(user != null) return newUserEmails.push(el);
    }))
    return newUserEmails
}
userSchema.statics.addUsersToRoom = async(roomID,userEmails)=>{
    await Promise.all(userEmails.map(async(el)=>{
        const user = await User.findOne({email:el})
        user.roomsIds.push(roomID)
        await user.save()
    }))
}

userSchema.statics.checkifUsersAlreadyFriends = async(user1,user2) =>{
    
    await Promise.all(user1.roomsIds.map(async(id)=>{
        
        const room = await Room.findOne({_id:id})
        if (room.userEmails.length == 2) //there is one in the chat 
            if ((user2.email == room.userEmails[0] && user1.email == room.userEmails[1]) || (user1.email == room.userEmails[0] && user2.email == room.userEmails[1])) 
                throw new Error('You are already friends')
    }))
}

const User = mongoose.model("User",userSchema)

module.exports = User