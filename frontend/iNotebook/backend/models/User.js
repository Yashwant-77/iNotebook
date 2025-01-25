import mongoose, { Schema } from "mongoose";


// Defining UserSchema using mongoose
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// Creating the User model
const User = mongoose.model('User', UserSchema);
// Creates a Mongoose model named 'User' based on the UserSchema


export default User;

