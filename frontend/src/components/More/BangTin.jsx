import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThongTinTN from './ThongTinTN';
const BangTin = () => {
  const [data, setData] = useState([]);
  const [soAnhHienThi, setSoAnhHienThi] = useState(6);
  const [showAll, setShowAll] = useState(false);
  const [thongTinTaiNan, setThongTinTaiNan] = useState(null)
  const [onOpen, setOnOpen]= useState(false)


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/home/tai-nan-all');
        setData(response.data); 
      } catch (error) {
        console.error('Lỗi lấy lên dữ liệu từ api bảng tin ', error);
      }
    };

    fetchData();
  }, []);


  const firstSixImages = data.slice(0, soAnhHienThi);
  const remainingImages = data.slice(soAnhHienThi);
  const loadMoreImg = () => {
    setSoAnhHienThi(soAnhHienThi+3)
  }
  const handleImgClick = (taiNanData) =>{
    setThongTinTaiNan(taiNanData)
    setOnOpen(true)
  }
  const handleClose = () =>{
    setThongTinTaiNan(null);
    setOnOpen(false)
  }
  return (
    <div className="px-20"> 
    <div className="grid grid-cols-3 gap-6 mt-10">
      {firstSixImages.map((item, index) => (
        <div key={item._id} className="w-full h-80 bg-gray-300">
          <img
            src={item.hinhAnh[0]}  
            alt={`Tai nan ${index}`}
            className="w-full h-full object-cover"
            onClick={()=>handleImgClick(item)}
          />
        </div>
      ))}
    </div>

    {remainingImages.length > 0 && (
      <button
      onClick={loadMoreImg}
      className="mt-4 text-blue-500 hover:text-blue-700 focus:outline-none"
    >
      Xem thêm &gt;&gt;
    </button>
    
    )}
    {thongTinTaiNan && (
        <ThongTinTN
          xeData={thongTinTaiNan.xe}
          taiNanData={thongTinTaiNan}
          onOpen ={onOpen}
          onClose={handleClose}
        />
      )}
  </div>
  );
};

export default BangTin
