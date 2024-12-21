import express from 'express';
import TaiNanController from '../controllers/TaiNanController.js';
import postPhatNguoi from '../controllers/PhatNguoiController.js';
import upload from '../middleware/upload.js';
import getData from '../controllers/data.js';
const router = express.Router()
router.get('/tai-nan',TaiNanController.getXeTaiNan)
router.post('/phatnguoi',postPhatNguoi)
router.get('/tai-nan-all',TaiNanController.getTaiNan)
router.post('/dongGopDuLieu',upload.single('hinhAnh'),TaiNanController.dongGopDuLieu)
router.post('/laydata',getData)
export default router