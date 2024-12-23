import express from 'express'

import UserController from '../controllers/UserController.js'
import authMiddleware from '../middleware/AuthMiddleware.js'
import LichSuController from '../controllers/LichSuController.js'

const userRouter = express.Router()
userRouter.get('/user',authMiddleware.verifyToken,UserController.getAllUser)
userRouter.delete('/user/:id',authMiddleware.verifyTokenAndAdminAuth,UserController.deleteUser)


userRouter.post('/history',authMiddleware.verifyToken,LichSuController.luuLichSu)
userRouter.get("/history",authMiddleware.verifyToken,LichSuController.getLichSu)
userRouter.delete('/history/:id',authMiddleware.verifyToken,LichSuController.deleteLichSu)
export default userRouter