import { verify } from 'crypto'
import jwt from 'jsonwebtoken'
const authMiddleware ={
    verifyToken:(req,res,next) =>{ // đămg nhập chưa
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
    verifyTokenAndAdminAuth:(req,res,next)=>{ // admin làm mọi quyền , người dùng thì hạn chế
        authMiddleware.verifyToken(req,res,()=>{
            if(req.user.id == req.params.id||req.user.admin){
                next()
            }
            else{
                return res.status(403).json("Bạn không thể thực hiện quyền này")
            }
        })
    },
    verifyTokenAndAdmin: (req, res, next) => { // chỉ có quyền admin
        authMiddleware.verifyToken(req, res, () => {
            if (req.user.admin) {
                next();
            } else {
                return res.status(403).json("Bạn không có quyền admin để thực hiện thao tác này");
            }
        });
    },
    verifyTokenBasic:(req,res,next)=>{ // có đăng nhaạp hay không
        const token = req.headers.token;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (!err) {
                    req.user = user; 
                }
            });
        }
        next();
    }
    
}
export default authMiddleware