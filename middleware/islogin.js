import obtainToken from "../token_folder/obtaintokenfronheader.js";
import tokenVerify from "../token_folder/verifyToken.js";

const isLogin = (req,res,next)=> {
    try{
        const token = obtainToken(req);

    const decodedUser = tokenVerify(token);
    req.userAuth = decodedUser.id;

    if (!decodedUser) {
        res.json({
            status:"error",
            message:"kindly log in again"
        })
    }else{
        next();
    }
    }catch(error) {
        console.log(error.message);
    }
}

export default isLogin;