import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import path from 'path';
import router from './routers/TaiNanRouter.js';
import { fileURLToPath } from 'url';
import authrouter from './routers/AuthRouter.js';
import userRouter from './routers/userRouter.js';
const DBdir = path.dirname(decodeURI(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:\/)/i, '$1')));
dotenv.config({ path: path.resolve(DBdir, '../.env') });
const app = express()
app.use(bodyParser.json()); 
app.use(cookieParser());
connectDB()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.use(express.json())
app.use('/home', router);
app.use('/auth',authrouter)
app.use('/quanli',userRouter)








const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
