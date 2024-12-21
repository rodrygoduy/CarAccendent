import axios from 'axios';
import Xe from '../models/xe.js';
import PhatNguoi from '../models/PhatNguoi.js';

const postPhatNguoi = async (req, res) => {
    const { bienso } = req.body;  
    console.log(bienso);
    if (!bienso) {
        return res.status(400).json({ error: 'Biển số xe là bắt buộc.' });
    }
    try { 
        const response = await axios.post('https://api.checkphatnguoi.vn/phatnguoi', 
            { bienso }, 
            {
                headers: {
                    'Accept': '*/*',
                    'Accept-Language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
                    'Connection': 'keep-alive',
                    'Content-Type': 'application/json',
                    'Origin': 'https://checkphatnguoi.vn',
                    'Referer': 'https://checkphatnguoi.vn/',
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-site',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                }
            }
        );
        return res.json(response.data); 
    } catch (error) {
        console.error('Lỗi toàn hoàm', error);
        return res.status(500).json({ error: 'Lỗi toàn bộ hàm PhatNguoi' });
    }
};

export default postPhatNguoi;
