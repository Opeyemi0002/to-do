import mongoose from "mongoose";

const taskInfo = new mongoose.Schema({
    task:{
        type:String,
        required:[true,"compulsory element"]
    },
    taskDescription:{
        type:String,
        required:[true,"compulsory element"]
    },
    date:{
        type:Date,
        required:[true,"compulsory element"]
    },   
    hours:{
        type:String

    },
    category:{
        type:String,
        enum:["personal", "shopping", "wishlist", "work"] 
        }
}, {
    timestamp: true,
    toJSON:{virtuals: true}
    });

const Task = mongoose.model('Task', taskInfo);

export default Task;