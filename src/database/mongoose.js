const mongoose = require('mongoose')

const db_url = process.env.MONGODB_URL

mongoose.connect(db_url,{
    useNewUrlParser: true ,
    useCreateIndex:true ,  //to quick access data from mongodb
    useFindAndModify:false
})