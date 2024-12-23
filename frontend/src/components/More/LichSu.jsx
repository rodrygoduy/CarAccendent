import React, { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/authSlice";
import { notification, Pagination } from "antd";

const LichSu = () => {
    const [historyList, setHistoryList] = useState([]); 
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [pageSize, setPageSize] = useState(10);

    const user = useSelector((state) => state.auth.login?.currentUser); 
    const dispatch = useDispatch();
    const axiosJWT = createAxios(user, dispatch, loginSuccess); 

    const fetchHistoryList = async () => {
        setIsLoading(true);
        setError(null); 
        try {
            const response = await axiosJWT.get("/quanli/history", {
                headers: {
                    token: `Bearer ${user.accessToken}`
                }
            });
            setHistoryList(response.data);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách lịch sử:", err);
            setError("Không thể tải lịch sử tìm kiếm. Vui lòng thử lại.");
        } finally {
            setIsLoading(false); 
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosJWT.delete(`/quanli/history/${id}`, {
                headers: {
                    token: `Bearer ${user.accessToken}`
                }
            });
            setHistoryList((prevHistory) => prevHistory.filter((item) => item._id !== id)); 
            notification.success({
                message: "Thành công",
                description: "Xóa thành công"
            });
        } catch (err) {
            console.error("Lỗi khi xóa lịch sử:", err);
            setError("Không thể xóa mục lịch sử. Vui lòng thử lại.");
        }
    };

    useEffect(() => {
        if (user?.accessToken) {
            fetchHistoryList(); 
        }
    }, [user?.accessToken]);
    const paginatedHistoryList = historyList.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageChange = (page, size) => {
        setCurrentPage(page);
        setPageSize(size);
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold text-center mb-6">Quản lý Lịch sử Tìm kiếm</h1>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>}
            {isLoading ? (
                <div className="text-center py-4">Đang tải dữ liệu...</div>
            ) : (
                <>
                    <table className="table-auto border-collapse w-full shadow-lg">
                        <thead>
                            <tr>
                                <th className="border px-4 py-2 bg-gray-200">Biển số</th>
                                <th className="border px-4 py-2 bg-gray-200">Kết quả</th>
                                <th className="border px-4 py-2 bg-gray-200">Thời gian</th>
                                <th className="border px-4 py-2 bg-gray-200">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedHistoryList.length > 0 ? (
                                paginatedHistoryList.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-100">
                                        <td className="border px-4 py-2 text-center">{item.bienSoTimKiem}</td>
                                        <td className="border px-4 py-2 text-center">{item.tainanTimKiem || "Không có tai nạn"}</td>
                                        <td className="border px-4 py-2 text-center">{new Date(item.searchedAt).toLocaleString()}</td>
                                        <td className="border px-4 py-2 text-center">
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                onClick={() => handleDelete(item._id)}
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-4">Không có lịch sử tìm kiếm nào.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    <div className="pagination-container mt-4">
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={historyList.length}
                            onChange={handlePageChange}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default LichSu;
