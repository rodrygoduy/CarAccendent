import express from 'express';
import TaiNanController from '../controllers/TaiNanController.js';
import postPhatNguoi from '../controllers/PhatNguoiController.js';
import upload from '../middleware/upload.js';
import authMiddleware from '../middleware/AuthMiddleware.js';

const router = express.Router()
router.get('/tai-nan',authMiddleware.verifyTokenBasic,TaiNanController.getXeTaiNan)
router.post('/phatnguoi',postPhatNguoi)
router.get('/tai-nan-all',TaiNanController.getTaiNan)
router.post('/dongGopDuLieu',upload.single('hinhAnh'),TaiNanController.dongGopDuLieu)

router.get('/xetDuyet',authMiddleware.verifyTokenAndAdmin,upload.single('hinhAnh'),TaiNanController.getTaiNanChoDuyet)
router.delete("/tai-nan/:id",authMiddleware.verifyTokenAndAdmin,TaiNanController.deleteTaiNan)
router.patch('/xetDuyet/done/:id',authMiddleware.verifyTokenAndAdmin,TaiNanController.doneTaiNan)
export default router