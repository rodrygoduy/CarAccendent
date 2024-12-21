import React, { useState } from "react";
import axios from "axios";
import { notification, Table } from 'antd';

const PhatNguoi = () => {
  const [bienso, setBienso] = useState('');
  const [data, setData] = useState(null);

  const handleBienSo = (e) => {
    setBienso(e.target.value);
  };

  const SubMit = async (e) => {
    e.preventDefault();
    if (!bienso) {
      notification.error({
        message: "Lỗi",
        description: "Biển số không được để trống"
      });
      return;
    }
    try {
      const response = await axios.post('/home/phatnguoi', { bienso });
      console.log(response.data.data);
      setData(response.data.data);
      notification.success({
        message: 'Đã tìm thấy dữ liệu',
        description: `Đã tìm thấy dữ liệu phạt nguội của: ${bienso}`,
      });
    } catch (error) {
      console.log("Lỗi gọi api phạt nguội");
      notification.error({
        message: 'Không tìm thấy dữ liệu',
        description: `Không tìm thấy phạt nguội của biển số ${bienso}`,
      });
    }
  };

  const columns = [
    {
      title: 'Số thứ tự',
      render: (text, record, index) => index + 1, 
      key: 'stt',
      width: '5%',
    },
    {
      title: 'Biển số xe',
      dataIndex: 'Biển kiểm soát',
      key: 'bienso',
    },
    {
      title: 'Thời gian vi phạm',
      dataIndex: 'Thời gian vi phạm',
      key: 'thoigian',
    },
    {
      title: 'Địa điểm vi phạm',
      dataIndex: 'Địa điểm vi phạm',
      key: 'diadiem',
    },
    {
      title: 'Hành vi vi phạm',
      dataIndex: 'Hành vi vi phạm',
      key: 'hanhvi',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'Trạng thái',
      key: 'trangthai',
    },
  ];

  return (
    <>
      <div className="w-max mx-auto font-bold text-5xl text-center">Tra cứu thông tin phạt nguội</div>
      <div className="mx-auto block w-max flex flex-col items-center">
        <input type="text" placeholder="Nhập biển số xe..."  className="mt-6 p-3 w-80 border border-gray-300 rounded-lg text-lg" onChange={handleBienSo}/>
        <button  className="bg-blue-500 text-white rounded-lg mt-6 p-3 w-80 border border-gray-300 rounded-lg text-lg" onClick={SubMit} >   Tra Cứu  </button>
      </div>

      {data && data.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-4 text-center">Kết quả Vi Phạm:</h3>
          <Table
            columns={columns}
            dataSource={data}
            rowKey={(record) => record["Biển kiểm soát"]}
            pagination={false} />
          {data.map((violation, index) => (
            <div key={index} className="mt-4 p-4 bg-gray-200 rounded-md">
              <h4 className="text-lg font-semibold">Những nơi giải quyết Lỗi vi phạm {index + 1}:</h4>
              <ul className="list-disc pl-6">
                {violation["Nơi giải quyết vụ việc"].map((item, idx) => (
                  <li key={idx}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PhatNguoi;
