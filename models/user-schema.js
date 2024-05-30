import mongoose from 'mongoose'
const schema = mongoose.Schema
const userSchema = new schema({
    userid:{
        type:String ,
        required:true
    } , 
    username:{
        type:String ,
        required:true 
    },
    name:{
        type:String ,
        required:true
    }, 
    lastname:{
        type:String , 
        required:true
    }

 


})
const User = mongoose.model( 'user' , userSchema)

export default User;