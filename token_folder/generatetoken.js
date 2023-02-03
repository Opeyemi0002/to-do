import jwt from "jsonwebtoken";

const generateToken = (id)=> {
    try{
        return jwt.sign({id},process.env.Token_Key,{expiresIn:process.env.Token_Expiry} )
    }catch(error) {
        console.log(error.message);
    }
}

export default generateToken;