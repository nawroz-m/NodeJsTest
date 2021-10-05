const mongoose = require('mongoose') //an Object Data Modeling library for MongoDB and Node
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,

    }, 
    email: {
        type: String,
        required: true,
        trim: true,
        
    },

    password: {
        type: String,
        required: true,
    }
})

// Find user by Credential and compare with hash password
userSchema.statics.findByCredential = async (email, password)=>{
    const user = await User.findOne({email})

    if(!user){
        throw new Error ("Unable to Log In!!")
    }
    const isMatch = await bcrypt.compare(password, user.password)
    console.log(isMatch)

    if(!isMatch){
        throw new Error ("Password Does Not Match!")
    }
    return user
}

// Hash the plain text password befor saving
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10)
    } 
    next() 
})

const User = mongoose.model('User', userSchema)

module.exports = User

