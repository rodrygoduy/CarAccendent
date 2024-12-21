import express from 'express'
import AuthController from '../controllers/AuthController.js'
import authMiddleware from '../middleware/AuthMiddleware.js'
const authrouter = express.Router()

authrouter.post("/register",AuthController.registerUser)
authrouter.post("/login", AuthController.LoginUser)
authrouter.post("/refesh",AuthController.requestRefeshToken)
authrouter.post("/logout",authMiddleware.verifyToken,AuthController.LogourUser)
export default authrouter