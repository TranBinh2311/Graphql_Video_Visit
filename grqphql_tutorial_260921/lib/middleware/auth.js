const jwt =  require('jsonwebtoken')

const authenticate = async (req, res, next) =>{
    const token = req.headers.authorization?.split(" ")[1] || ""
    try{
        //const verified =  jwt.verify(token, process.env.JWT_SCRET);
        const verified =  jwt.decode(token, process.env.JWT_SCRET);
        req.verifiedUser = verified.user ;
        //console.log("Verified successfully", verified );
        next();
    }
    catch(err){
        console.log("Verified failed");
        next();
    }
}

module.exports = { authenticate }