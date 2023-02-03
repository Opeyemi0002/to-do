
const obtainToken = (req)=> {
   try{
    const headers = req.headers;
    const token = headers['authorization'].split(' ')[1]

    if(!token) {
        return "please login again";
    }else{
        return token;
    }
   }catch(error) {
    console.log(error.message);
   }
}
export default obtainToken;