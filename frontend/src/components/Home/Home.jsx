import React, { useState } from 'react';
import axios from 'axios'
import {notification} from 'antd'
import ThongTinTN from '../More/ThongTinTN';
import BangTin from '../More/BangTin';
import DongGopDuLieu from '../More/DongGopDuLieu';
import {useDispatch, useSelector} from 'react-redux'

const Home = () =>{
    const [bienSo, setBienSo] = useState('')
    const [xeData, setXeData] = useState(null);
    const [taiNanData, setTaiNanData]= useState('null')
    const [isVisible, setIsVisible] = useState(false);
    
    const user = useSelector((state) => state.auth.login.currentUser);

    const handleBienSo = (e) => {
      setBienSo(e.target.value)
    }
    const SubMit = async (e) => {
      e.preventDefault();
      setXeData(null);
      setTaiNanData(null);
      if(!bienSo){
        notification.error({
          message:"Lỗi",
          description:"Biển Số không được để trống"
        })
        return;
      }
      try{
        const headers = user?.accessToken ? { token: `Bearer ${user.accessToken}` } : {};
        const reponse = await axios.get(`/home/tai-nan?bienSo=${bienSo}`,{
          headers
        })
        console.log(reponse)
        if (reponse.data && reponse.data.xe && reponse.data.taiNan) {
          setXeData(reponse.data.xe);
          setTaiNanData(reponse.data.taiNan);
          notification.success({
            message:"tìm thấy dữ liệu",
            description:`Đã tìm được dữ liệu cho biển số ${bienSo}`
          })
          setIsVisible(true)
        }
      }catch(error){
        console.log("Lỗi gọi api")
        notification.error({
          message: 'Không tìm thấy dữ liệu',
          description: `Không tìm thấy dữ liệu cho biển số ${bienSo}`,
        });
      }
    }
    const onClose = () => {
      setIsVisible(false);
    }
    const onOpen = () =>{
      setIsVisible(true)
    }

    return (
      <>
      <div class="w-max mx-auto font-bold text-5xl text-center">Tra cứu xe tai nạn</div>
        <div class="mx-auto block w-max flex flex-col items-center">
          <input type="text" placeholder="Nhập biển số xe..." class="mt-6 p-3 w-80 border border-gray-300 rounded-lg text-lg" onChange={handleBienSo}/>
          <p className="text-red-500 italic text-1xl mt-2">Lưu ý: Biển số có dạng 34A12345</p>
          <button class=" bg-blue-500 text-white rounded-lg mt-6 p-3 w-80 border border-gray-300 rounded-lg text-lg" onClick={SubMit}>Tra Cứu</button>
        </div>
        <div className="mt-4 flex justify-start ">
          <p className="text-black font-bold px-20 text-3xl"> Một số vụ tai nạn mới được cập nhật: </p>
      </div>
        {isVisible && xeData && taiNanData && (
        <ThongTinTN xeData={xeData} taiNanData={taiNanData} onClose={onClose} onOpen ={onOpen} />
      )}
      <BangTin></BangTin>
      <DongGopDuLieu></DongGopDuLieu>
      </>
    )
}
export default Home