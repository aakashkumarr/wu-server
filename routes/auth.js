const router = require("express").Router();
const UserMode = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const authMiddleware = require('../middleware/auth.middleware')
router.get("/",authMiddleware,async(req,res)=>{
    if(req.userId){

        let user = await UserModel.findById(req.userId)
        if(!user){

            return res.status(404).send('userNotFound')
        }
        return res.status(200).json(user)
    }
    return res.status(401).send('Unauthorized')
})

router.post("/login", async (req, res) => {
try {
    if (req.body.user) {
        const { email, password } = req.body.user;
        if(!email.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/)) return res.status(401).send('invalid email')
        let user = await UserModel.findOne({ email: email.toLowerCase() }).select("+password");
        if (!user) return res.status(404).send("User not found with this email");
        console.log(user)
        let isCorrect = await bcrypt.compare(password,user.password)
        console.log(isCorrect)
        if(!isCorrect)
        return res.status(401).send('Invalid Password');
        let payload ={userId: user._id}
            jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'48h'},(err,token)=>{
                if(err) throw err
                return res.status(200).send(token)
            })
      }
    //   return res.status(400).send('invalid requset')
} catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
}
});
router.post("/signup", async (req, res) => {
try {
    console.log(req.body.user)
    if (req.body.user) {
        const { name, email, password } = req.body.user;
        let user = await UserModel.findOne({ email: email.toLowerCase() });
        if (user) return res.status(401).send("user already registered");
        user = new UserModel({ name, email });
        user.password = await bcrypt.hash(password, 10);
        await user.save();
    
        return res.status(201).send('successfully signed up')
      }
} catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
}
});

module.exports=router