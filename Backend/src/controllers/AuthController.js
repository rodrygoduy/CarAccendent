import bcrypt from 'bcrypt'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'

let refeshTokens = [];
const registerUser =async (req, res)=>{
    try{
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(req.body.password,salt)

        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        const user = await newUser.save()
        res.status(200).json(user)
    }catch(error){
        res.status(500).json(error)
    }
} 
const generateAccessToken = (user)=>{
    return jwt.sign({
        id: user.id,
        admin:user.admin
    },
    process.env.JWT_ACCESS_key,
    {expiresIn:"20d"}
);
}
const generateRefeshToken = (user)=>{
    return jwt.sign({
        id: user.id,
        admin:user.admin
    },
        process.env.JWT_Refesh_TOKEN,
        {expiresIn:"365d"}
    )
}
const LoginUser = async (req,res)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user){
            return res.status(404).json("Không đúng tài khoản!");
        }
        const Validpassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!Validpassword){
            return res.status(404).json("Sai passowro")
        }
        if(user && Validpassword){
        const accessToken = await generateAccessToken(user)
        const refeshToken = await generateRefeshToken(user)
        refeshTokens.push(refeshToken)
        res.cookie("refeshToken",refeshToken,{
            httpOnly:true,
            secure:false,
            path:'/',
            sameSite:"strict"
        })

        const {password, ...others}= user._doc;
            return res.status(200).json({...others,accessToken})
        }
    }catch(error){
        return res.status(500).json(error)
    }

}

const requestRefeshToken = async (req, res) => {
    const refeshToken = req.cookies.refeshToken;
    if (!refeshToken) {
        console.error("No refresh token in cookies.");
        return res.status(401).json("Bạn chưa đăng nhập");
    }

    if (!refeshTokens.includes(refeshToken)) {
        console.error("Refresh token not found in the list.");
        return res.status(403).json("Token không đúng");
    }

    jwt.verify(refeshToken, process.env.JWT_Refesh_TOKEN, (err, user) => {
        if (err) {
            console.error("Error verifying refresh token:", err.message);
            return res.status(403).json("Token không hợp lệ hoặc hết hạn");
        }
        refeshTokens = refeshTokens.filter((token) => token !== refeshToken);
        const newAccessToken = generateAccessToken(user);
        const newRefeshToken = generateRefeshToken(user);
        if (!newAccessToken || !newRefeshToken) {
            console.error("Failed to generate new tokens.");
            return res.status(500).json("Không thể tạo token mới");
        }
        refeshTokens.push(newRefeshToken);
        res.cookie("refeshToken", newRefeshToken, {
            httpOnly: true,
            secure: false, 
            path: '/',
            sameSite: "strict",
        });

        return res.status(200).json({ accessToken: newAccessToken });
    });
};


const LogourUser = async (req,res)=>{
    res.clearCookie("refeshToken");
    refeshTokens = refeshTokens.filter(token => token !== req.cookies.refeshToken)
    return res.status(200).json("đăng xuất thành công")

}
export default {registerUser,LoginUser,requestRefeshToken,LogourUser}