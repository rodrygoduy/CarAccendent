import { verify } from 'crypto'
import jwt from 'jsonwebtoken'
const authMiddleware ={
    verifyToken:(req,res,next) =>{
        const token = req.headers.token
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken,process.env.JWT_ACCESS_key,(err,users)=>{
                if(err){
                    return res.status(403).json("Token sai roi , hoac het han")
                }
                req.user = users
                next()
            })
        }
        else{
            return res.status(401).json("Bajn khong phai nguoi dung")
        }
    },
    verifyTokenAndAdminAuth:(req,res,next)=>{
        authMiddleware.verifyToken(req,res,()=>{
            if(req.user.id == req.params.id||req.user.admin){
                next()
            }
            else{
                return res.status(403).json("Bạn không thể thực hiện quyền này")
            }
        })
    }
}
export default authMiddleware