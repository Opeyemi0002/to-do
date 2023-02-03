import express from "express";
import { userLogin, userRegistration,getUser, createTask,deleteTask,getAllUsers,deleteUser,updateTask, allTasks } from "../controller/usercontroller.js";
import isLogin from "../middleware/islogin.js";

const router = express.Router();
//register user
router.post ('/register', userRegistration);

//login user
router.post('/login', userLogin);
//get user
router.get('/profile', isLogin, getUser);
//get all users
router.get('/', isLogin, getAllUsers);
//delete user
router.delete('/deleteuser', isLogin, deleteUser);
// create task
router.post('/create-task', isLogin, createTask);
//update Tasks
router.put('/:id', isLogin, updateTask);
// get all tasks
router.get('/alltasks', isLogin, allTasks);
// delete tasks
router.delete('/:id', isLogin, deleteTask);

export default router;