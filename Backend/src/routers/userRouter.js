import express from 'express'

import UserController from '../controllers/UserController.js'
import authMiddleware from '../middleware/AuthMiddleware.js'

const userRouter = express.Router()
userRouter.get('/user',authMiddleware.verifyToken,UserController.getAllUser)
userRouter.delete('/user/:id',authMiddleware.verifyTokenAndAdminAuth,UserController.deleteUser)


export default userRouter