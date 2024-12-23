import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (

    <footer className="bg-gray-800 text-gray-300 py-8 mg mt-10 h-full">
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-white mb-4 text-3xl">FindCarAccident</h1>
            <p className="text-1xl">
              Website của chúng tôi mang tính chất tham khảo, dữ liệu được cóp nhặt từ nhiều nguồn
            </p>
          </div>
          <div className="text-center">
            <h2 className="font-bold text-white mb-4 text-3xl">Menu</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-yellow-400">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-yellow-400">
                  Tiện ích
                </a>
              </li>
              <li>
                <a href="/gioi-thieu" className="hover:text-yellow-400">
                  Giới Thiệu
                </a>  </li>

            </ul>
          </div>
          <div className="text-center md:text-right">
            <h2 className="text-3xl font-bold text-white mb-4">Liên hệ</h2>
            <ul className="space-y-2">
              <li>
                <span>Địa chỉ: Landmark 72,Đường: Phạm Hùng, Nam Từ Liêm, Hà Nội</span>
              </li>
              <li>
                <a href="tel:+84123456789" className="hover:text-white">
                  Điện thoại: +84 54827766
                </a>
              </li>
              <li>
                <a href="mailto:info@example.com" className="hover:text-white">
                  Email: nguyenduysv79@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 flex justify-center space-x-6">
        <a
            href="https://www.facebook.com/er.clyb?locale=vi_VN"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
          >
            <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCkVMaWfv7YrsQZ_4fpTQiUQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-500 hover:text-red-600"
          >
            <FontAwesomeIcon icon={faYoutube} className="text-2xl" />
          </a>
          <a
            href="https://www.instagram.com/duy79_05/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:text-pink-600"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
          </a>
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} FindCarAccident, Design: RoduyGo
        </div>
      </div>
    </footer>
  );
};

export default Footer;
