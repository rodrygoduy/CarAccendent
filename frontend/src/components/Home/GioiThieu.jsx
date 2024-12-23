import React from "react";

const GioiThieu = () => {
  return (
    <div className="bg-gray-50 text-gray-800 px-8 py-12 max-w-5xl mx-auto rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Xin chào các bạn đọc và người sử dụng</h1>
      <p className="mb-4">
      Chào mừng bạn đến với FindCarAccident nền tảng trực tuyến hỗ trợ tra cứu thông tin về các phương tiện liên quan đến tai nạn giao thông. Trang web được phát triển với mục đích cung cấp nguồn thông tin hữu ích, giúp người dùng nhanh chóng tra cứu thông tin về biển số xe liên quan đến sự cố giao thông, hỗ trợ trong việc tìm kiếm dữ liệu tham khảo một cách minh bạch và tiện lợi.
      </p>
      <h2 className="text-xl font-semibold mb-4">Các bạn đọc và người sử dụng cần hiểu rằng:</h2>
      <ul className="list-disc list-inside space-y-4">
        <li>
          <strong>Tài liệu Tham Khảo:</strong> Hình ảnh và các bài viết chứa thông tin được chúng tôi cóp nhặt từ nhiều nguồn trên Internet, chúng tôi không cam kết là chính xác tuyệt đối 
        </li>
        <li>
          <strong>Không Chịu Trách Nhiệm:</strong> FindCarAccident hoạt động với mục đích tham khảo, không cung cấp bằng chứng pháp lý hoặc chịu trách nhiệm pháp lý liên quan đến thông tin trên trang web.
        </li>
        <li>
          <strong>Nguồn Thông Tin Bên Ngoài:</strong> Chúng tôi có thể cung cấp liên kết đến các nguồn thông tin bên ngoài. Chúng tôi không kiểm soát hoặc chịu trách nhiệm về nội dung của các trang web bên ngoài này.Dữ liệu và hình ảnh chỉ mang tính chất minh họa, vui lòng kiểm tra thông tin từ các nguồn chính thống khi cần thiết
        </li>
      </ul>
      <p className="mt-6">
      Chúng tôi không ngừng cải thiện dịch vụ, bổ sung dữ liệu và tính năng mới để trở thành nền tảng hữu ích cho cộng đồng, góp phần hỗ trợ trong việc tra cứu và kiểm tra thông tin giao thông an toàn và hiệu quả.
      </p>
      <p className="mt-4">
        Mọi thông tin thắc mắc, hợp tác vui lòng liên hệ qua email: 
        <a href="mailto:nguyenduysv79@gmail.com" className="text-blue-600 font-medium hover:underline">
         nguyenduysv79@gmail.com
        </a>
      </p>
      <p className="mt-6">Trân trọng,</p>
    </div>
  );
};

export default GioiThieu
