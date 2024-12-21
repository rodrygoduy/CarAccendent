import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, notification } from "antd";

const DongGopDuLieu = () => {
  const [bienSo, setBienSo] = useState("");
  const [hinhAnh, setHinhAnh] = useState(null);
  const [moTa, setMoTa] = useState("");
  const [linkBV, setLinkBV] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const onClose = () => setIsModalOpen(false);

  const handleFileChange = (e) => {
    setHinhAnh(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("bienSo", bienSo);
      formData.append("moTa", moTa);
      formData.append("linkBV", linkBV);
      formData.append("hinhAnh", hinhAnh);

      const response = await axios.post("/home/dongGopDuLieu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      notification.success({
        message: "Đã đóng góp",
        description: "Dữ liệu của bạn đã được ghi lại.",
      });
      onClose();
    } catch (error) {
      console.error("Lỗi khi đóng góp:", error);
      notification.error({
        message: "Lỗi",
        description: error.response?.data?.message || "Có lỗi xảy ra trong quá trình gửi dữ liệu.",
      });
    }
  };

  return (
    <div>
      <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded-md ml-20 mt-5">
        Đóng góp dữ liệu
      </button>
      <Modal
        title={<div className="text-center font-bold text-4xl text-gray-800">Đóng góp dữ liệu</div>}
        open={isModalOpen}
        onCancel={onClose}
        footer={null}
        width="70%" 
        className="!p-4"
        bodyStyle={{ padding: '20px' }} 
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label htmlFor="bienSo" className="block text-lg font-semibold mb-2 text-gray-700">
              Biển số xe:
            </label>
            <input
              type="text"
              id="bienSo"
              value={bienSo}
              onChange={(e) => setBienSo(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="hinhAnh" className="block text-lg font-semibold mb-2 text-gray-700">
              Ảnh tai nạn:
            </label>
            <input
              type="file"
              id="hinhAnh"
              name="hinhAnh"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="moTa" className="block text-lg font-semibold mb-2 text-gray-700">
              Mô tả vụ tai nạn:
            </label>
            <textarea
              id="moTa"
              value={moTa}
              onChange={(e) => setMoTa(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="linkBV" className="block text-lg font-semibold mb-2 text-gray-700">
              Link bài viết:
            </label>
            <input
              type="text"
              id="linkBV"
              value={linkBV}
              onChange={(e) => setLinkBV(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold p-3 rounded-lg shadow-lg w-full hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Gửi thông tin
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default DongGopDuLieu;
