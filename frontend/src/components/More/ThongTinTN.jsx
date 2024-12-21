import React from 'react';
import { Modal} from 'antd';

const ThongTinTN = ({ xeData, taiNanData, onOpen, onClose }) => {
  return (
    <Modal
      title={<div className="text-center font-bold text-4xl text-gray-800">Thông Tin Tai Nạn</div>}
      open={onOpen}
      onCancel={onClose}
      footer={null}
      width="70%" 
      className="!p-4"
      bodyStyle={{ padding: '20px' }} 
    >
      <div>
        <h3 className="text-2xl font-semibold">Thông tin xe:</h3>
        <div className="mt-2">
          <p><strong>Biển số: </strong>{xeData.bienSo}</p>
        </div>

        <h3 className="text-2xl font-semibold mt-6">Thông tin tai nạn:</h3>
        <div className="mt-2">
          <p><strong>Mô tả: </strong>{taiNanData.moTa}</p>
          <p><strong>Link bài viết: </strong><a href={taiNanData.linkBV} target="_blank" rel="noopener noreferrer" className="text-blue-500">{taiNanData.linkBV}</a></p>
          <div className="mt-4">
            <strong>Hình ảnh:</strong>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {taiNanData.hinhAnh.map((img, index) => (
                <img key={index} src={img} alt={`Tai nạn ${index}`} className="w-auto h-auto object-cover rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ThongTinTN;
