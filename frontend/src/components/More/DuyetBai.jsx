import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/authSlice";
import { notification } from "antd";
import ThongTinTN from './ThongTinTN';
const DuyetBai = () => {
    const [baiViet, setBaiViet] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [modalVisible, setModalVisible] = useState(false); 
    const [selectedAccident, setSelectedAccident] = useState(null)
    const user = useSelector((state)=>state.auth.login?.currentUser)
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user, dispatch, loginSuccess); 

    const layDanhSach= async () => {
        setIsLoading(true);
        try {
            const response = await axiosJWT.get("/home/xetduyet",{
                headers :{
                    token: `Bearer ${user.accessToken}`
                }
            });
            setBaiViet(response.data);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách :", err);
        } finally {
            setIsLoading(false); 
        }
    };
    const handleDelete = async (id) => {
            try {
                await axiosJWT.delete(`/home/tai-nan/${id}`,{
                    headers :{
                        token: `Bearer ${user.accessToken}`}
                });
                setBaiViet((prevHistory) => prevHistory.filter((item) => item._id !== id)); 
                layDanhSach();
                notification.success({
                          message:"Thành công",
                          description:"Xóa thành công"
                        })
            } catch (err) {
                console.error("Lỗi khi xóa bài:", err);
            }
        };
        const doneBV = async (id) => {
            try {

                const response = await axiosJWT.patch(`/home/xetDuyet/done/${id}`, null, {
                    headers: {
                        token: `Bearer ${user.accessToken}` 
                    }
                });
                notification.success({
                    message: "Thành công",
                    description: "Bài viết được duyệt thành công",
                });
            } catch (err) {
                console.error("Lỗi khi duyệt bài:", err.response?.data || err.message);
                notification.error({
                    message: "Lỗi",
                    description: err.response?.data?.error || "Không thể duyệt bài viết.",
                });
            }
        };
        
    const handleViewDetails = (accident) => {
        setSelectedAccident(accident); 
        setModalVisible(true); 
    };
    const handleCloseModal = () => {
        setModalVisible(false); 
        setSelectedAccident(null); 
    };
    useEffect(() => {
        if (user?.accessToken) {
            layDanhSach(); 
        }}, [user?.accessToken]);
    return (
        <div className="container mx-auto p-8">
            <div className="text-3xl font-bold text-gray-800 mb-8">Danh sách tai nạn chờ duyệt</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {Array.isArray(baiViet) && baiViet.length > 0 ? (
                    baiViet.map((accident) => (
                        <div
                            key={accident._id}
                            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-between transform transition-transform hover:scale-105" >
                            <div className="text-xl font-semibold text-gray-700 mb-2">
                                {accident.moTa || 'Không có mô tả'}
                            </div>
                            <div className="flex flex-col gap-2 mt-4">
                                <button
                                    className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"  onClick={() => handleViewDetails(accident)}      >
                                    Xem chi tiết
                                </button>
                                <button
                                    className="text-sm bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={() => doneBV(accident._id)}   >
                                    Duyệt
                                </button>
                                <button
                                    className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={() => handleDelete(accident._id)}  >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 text-lg">Không có tai nạn nào chờ duyệt.</div>
                )}
            </div>
             {selectedAccident && (
                <ThongTinTN
                    xeData={{ bienSo: selectedAccident.xe?.bienSo || "Không xác định" }}
                    taiNanData={selectedAccident} 
                    onOpen={modalVisible} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
};

export default DuyetBai;
