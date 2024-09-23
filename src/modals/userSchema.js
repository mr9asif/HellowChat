import mongoose, { Schema } from "mongoose";

 const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
   
});

// Correctly export the User model
const User= mongoose.models.Users || mongoose.model('Users', UserSchema);
export default User;