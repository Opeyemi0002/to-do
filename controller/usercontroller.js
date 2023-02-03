import User from "../model/Usermodel.js";
import bcrypt from "bcrypt";
import sendEmail from "../Sendemail/verificationmail.js"
import generateToken from "../token_folder/generatetoken.js";
import Task from "../model/taskmodel.js";

export const userRegistration  = async(req,res)=> {
    try{
        const {firstname, lastname, email, password} = req.body;

        const userDetails = await User.findOne({email});

       if (userDetails) {
            return res.json({
                status: "error",
                message: "user exits already"
            });
        }
        else {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password,salt);
            const newUser = await User.create({
                firstname,
                lastname,
                email,
                password:passwordHash
        });
        
        await sendEmail(email);
       res.json({
            status:"success",
            data: newUser
        });
    }
    }catch(error) {
        console.log(error.message);
        }
}

export const userLogin = async (req,res)=>{
    try{
        const {email, password} = req.body;
        const userFound = await User.findOne({email});

        if (!userFound) {
            res.json({message: "the email or password is wrong"});
        }
        const passwordHash = await bcrypt.compare(password, userFound.password);
        
        if(!passwordHash) {
            res.json({message: "the email or password is wrong"});
        }
        else{
            res.json({
                firstname: userFound.firstname,
                lastname:userFound.lastname,
                email: userFound.email,
                token:generateToken(userFound._id)
        });
    }

    }catch(error) {
        console.log(error.message);
    }

}

export const getUser = async (req,res)=> {
    try{
        const userFound = await User.findById(req.userAuth);
        console.log( req.userAuth);
        if (userFound) {
            return res.json({
                status: "status",
                data: userFound
            });
    }   else res.json({message: "user doesn't exist"});
        }catch (error) {
            console.log(error.message);
        }
}

export const getAllUsers = async (req,res)=> {
    try{
    const allUsers = await User.find({});
    res.json({
        status:"success",
        data: allUsers
    });
    
    }catch(error){
        console.log(error.message);
    }
}
export const updateUser = async (req,res)=> {
    try{
        const {firstname, lastname, email, password} = req.body;

        const salt = await bcrypt.genSalt(10);
        const NewPass = await bcrypt.hash(password,salt);
        
        await User.findByIdAndUpdate(req.userAuth,{firstname, lastname, email, password:NewPass}, {useFindAndModify:false});
         
        res.json({message: "the user has been updated successfully"});
    }catch(error) {
        console.log(error.message);
    }
}
export const deleteUser = async (req, res)=> {
    try{
        await User.findByIdAndDelete(req.userAuth);
        res.json({
                message:"the user has been deleted succesfully"
            });        
        
    }catch(error) {
        console.log (error.message);

    }
}

export const createTask = async (req,res)=> {
    try{
        const {task,taskDescription,date,hours,category } = req.body;
        const taskCheck = await Task.findOne({task});

        if(taskCheck) {
            return res.json({message:"task exists already. you can update the task"});
        }
        else{
           const NewTask = await Task.create({
            task,
            taskDescription,
            date,
            hours,
            category
        }); 

        res.json({
            status: "success",
            data: NewTask
        });
        }
        
    }catch(error){
        console.log(error);
    }
}

export const updateTask =async (req,res)=> {
    try{
        const {id} = req.params;
        const {task,date,hours,taskDescription} = req.body;
        
        await Task.findOneAndUpdate({_id:id},{task,date, hours,taskDescription}, {useFindAndModify:false});
         
        res.json({message: "the user has been updated successfully"});
       
        }catch(error) {
        console.log (error.message);

    }
}

export const allTasks = async (req,res)=> {
    const allTasks = await Task.find({});
    res.json({
        status:"success",
        data: allTasks
    })
}

export const deleteTask = async (req, res)=> {
    const {id} = req.params;
    try{
        await Task.findOneAndDelete({_id:id});
        res.json({
                message:"the task has been deleted succesfully"
            });        
        
    }catch(error) {
        console.log (error.message);

    }
}