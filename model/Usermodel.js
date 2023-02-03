import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true, "user is compulsory"]
    },
    lastname:{
        type:String,
        required:[true, "user is compulsory"]
    },
    password:{
        type:String,
        required:[true, 'input is compulsory']
    },
    email:{
        type:String,
        required:[true, 'input is compulsory']
    },
    verification:{
        type:Boolean,
        default: false
    },
    profilePicture:{
        type:String,
    },
    isBlock:{
        type:Boolean,
        default:false
    },
    tasks:{
        type:String,
        ref: "User"
    }
}, {
    timestamps:true,
    toJSON:{virtuals:true}

});

const User = mongoose.model('user', userModel);

export default User;