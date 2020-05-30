export class RoomModel{

    constructor(public _id:String,public name:String,public messages:{fromUser:String,message:String}[],public userEmails:String[]){}
}