const express = require('express')
const Room = require('../models/room')
const User = require('../models/user')

const router = new express.Router();


//Adding new Group
//recieve name of chat and array of users included the creator of the group
router.post('/rooms/add',async(req,res)=>{
 
    const name = req.body.name
    let userEmails = req.body.userEmails.slice()
    userEmails = await User.filterExistingUsers(userEmails)
    const room = new Room({name,userEmails})
    try{
        await room.save()
        await User.addUsersToRoom(room._id,userEmails)
        res.status(201).send(room)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

//recieve 2 emails of users
router.post('/rooms/addUser',async(req,res)=>{
    try{
        const user1 = await User.checkUserExist(req.body.email1); //creator
        const user2 = await User.checkUserExist(req.body.email2); //other
         await User.checkifUsersAlreadyFriends(user1,user2);//check if they are already friends
        const userEmails = [user1.email,user2.email]
        const room = new Room({name:'',userEmails})
        const createdRoom = await room.save();
        user1.roomsIds.push(createdRoom._id)
        await user1.save()
        user2.roomsIds.push(createdRoom._id)
        await user2.save()
        res.status(201).send(createdRoom)
    }catch(e){
        res.status(400).send(e.message)
    }


})

router.post('/rooms/getAllRooms',async(req,res)=>{
    try{
        const user = await User.checkUserExist(req.body.email)
        const allRooms = [];
        await Promise.all(user.roomsIds.map(async(roomID)=>{
            const room = await Room.findOne({_id:roomID})
            if (room.name == ''){ //only two users is in this room
                if (room.userEmails[0] == req.body.email) {
                    const otherUser = await User.findOne({email:room.userEmails[1]})
                    room.name = otherUser.name;
                }
                else {
                    const otherUser = await User.findOne({email:room.userEmails[0]})
                    room.name = otherUser.name;
                }
            }
            allRooms.push(room)
        }))
        res.status(200).send(allRooms)
    }catch(e){
        res.status(400).send(`user doesnt't exists`)
    }

})

router.post('/rooms/saveMessage',async(req,res)=>{

    const roomID = req.body.roomID
    const email = req.body.email
    const message = req.body.message
    try {
        const room = await Room.findById({_id:roomID})
        if (!room) throw new Error('Room Not Found')
        room.messages.push({fromUser:email,message:message})
        await room.save()
        res.status(201).send(room.messages)
    }catch(e){
        res.status(400).send(e)
    }

})

router.post('/rooms/getMessagesForRoom',async(req,res)=>{
    const roomID = req.body.roomID
    try{
        const room = await Room.findById({_id:roomID})
        if (!room) throw new Error('Room Not Found')
        res.status(200).send(room.messages)
    }catch(e){
        res.status(400).send(e)
    }
})
module.exports = router