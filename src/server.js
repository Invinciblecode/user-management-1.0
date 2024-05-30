// npm install express app mongoose dotenv path nodemon nanoid ejs

import express from 'express'
const app = express();
const PORT = process.env.PORT || 3000
import mongoose from 'mongoose'
import User from '../models/user-schema.js'
import dotenv from 'dotenv'
import { log} from 'console'
dotenv.config();
//json 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// connect to the database 
mongoose.connect(process.env.PRIVATE_KEY)
.then( ()=>{
    console.log('connected to the data base')
})
.catch( (err) =>{
    console.log(err)
})
// list
app.get('/users' , async(req ,res) =>{
    const userslist =await  User.find()
    res.json(userslist)
})

//create
app.post('/create/user' , async (req , res ) =>{

   const usersLength =await User.countDocuments()
   const id = usersLength +1
    const newUser = new User({
        userid:id, 
        username:req.body.username,
        name:req.body.name, 
        lastname:req.body.lastname,
        
    })
   await newUser.save()
     res.json(newUser)


    
})
//update
app.patch('/update/user/:userid' ,async (req , res) =>{
    const userid = req.params.userid 
    const updatedData = req.body
    const updatedUser = await User.findByIdAndUpdate(userid, updatedData, {new:true})
    await res.json(updatedUser)

})
// delete
app.delete('/delete/user/:userid' , async(req ,res) =>{
    const userid = req.params.userid
    const deletedUser =await User.findByIdAndDelete(userid)
    res.send('user deleted successfully')
})

app.delete('/delete-all-users' ,async (req,res) =>{
    await User.deleteMany({})
     .then( 
        res.send('all of the users are deleted ')
     )
     .catch( (err) =>{
        console.log(err)
     })
})




























app.listen(PORT , () =>{
    console.log('server is on')
})