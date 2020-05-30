export class UserModel{
    /* "roomsIds": [],
    "_id": "5eb01581ff1dd12cf81cadf6",
    "name": "joe",
    "email": "y@yahoo.com",
    "password": "1234567",
    "__v": 0 */
    constructor(private _id:string,public email:string,private name:string,private password:string,private roomsIds:number[]){}
    get userName(){
        return this.name;
    }
}