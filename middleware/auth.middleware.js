const jwt = require('jsonwebtoken')

module.exports=(req,res,next)=>{
    console.log(req.headers.authorization)
    try {
        
        if(req.headers.authorization){
            let {userId}= jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
            req.userId=userId;
            next()
            return;
        }
        return res.status(401).send("Unauthroized")
        

    } catch (error) {
        console.error(error)
        return res.status(401).send('Unauthorized')
    }
   
}


