import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Home/Navbar';
import Home from './components/Home/Home';
import Tienich from './components/Home/TienIch';
import PhatNguoi from './components/Home/PhatNguoi';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import QLUser from './components/More/QLUser';
import LichSu from './components/More/LichSu';
import Footer from './components/Home/Footer';
import GioiThieu from './components/Home/GioiThieu';
import DuyetBai from './components/More/DuyetBai';

const App = () => {
  const location = useLocation();

  const excludedPaths = ['/login', '/register'];
  const showNavbar = !excludedPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && <Navbar />}
      <main className="flex-grow mt-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tien-ich" element={<Tienich />} />
          <Route path="/gioi-thieu" element={<GioiThieu/>}/>
          <Route path="/lien-he" element={<h2>Liên hệ</h2>} />
          <Route path="/tra-phat-nguoi" element={<PhatNguoi />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/qluser" element={<QLUser />} />
          <Route path="/lichsu" element={<LichSu />} />
          <Route path="/duyetbai" element={<DuyetBai />} />
          <Route path="*" element={<h2>404 - Trang không tồn tại</h2>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
