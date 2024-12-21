import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Menu, Button } from "antd";
import { DownOutlined, LoginOutlined, UserAddOutlined,UserOutlined ,LogoutOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux'
import { logOut } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logoutSuccess } from "../../redux/authSlice";

const Navbar = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const accessToken = user?.accessToken
  const id = user?._id
  let axiosJWT = createAxios(user,dispatch,logoutSuccess)
  const handleLogout = ()=>{
    logOut(dispatch,id,navigate,accessToken,axiosJWT)
  }
  const adminMenu =(
    <Menu>
      <Menu.Item icon={<UserOutlined />}>
        <Link to="/qluser">Quản lý</Link> 
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  )
  const userMenu=(
    <Menu>
      <Menu.Item icon={<UserOutlined />}>
        <Link >Lịch sử kiếm </Link> 
      </Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} >
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  const menu = (
    <Menu>
      <Menu.Item>
        <Link to="/tra-phat-nguoi" className="dropdown-item text-2xl">
          Tra cứu phạt nguội
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/tra-dang-kiem" className="dropdown-item text-2xl">
          Tra cứu đăng kiểm
        </Link>
      </Menu.Item>
    </Menu>
  );

  const Regis = (
    <Menu>
      <Menu.Item  icon={<LoginOutlined />}>
      <Link to="/login" className="dropdown-item text-2xl">
          Login
        </Link>
      </Menu.Item>
      <Menu.Item  icon={<UserAddOutlined />}>
      <Link to="/register" className="dropdown-item text-2xl">
          Register
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="flex items-center justify-between py-8 px-16">
        <Link to="/" className="text-2xl font-bold ml-2.5">
          LOGO
        </Link>

        <div className="flex space-x-20 mx-auto flex-grow justify-center text-3xl">
          <Link to="/" className="hover:text-yellow-400">    Trang chủ </Link>
          <Dropdown overlay={menu} trigger={['hover']} className="hover:text-yellow-400 cursor-pointer">
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>  Tiện ích 
              </a> 
          </Dropdown>
          <Link to="/gioi-thieu" className="hover:text-yellow-400">   Giới thiệu </Link>
          <Link to="/lien-he" className="hover:text-yellow-400">   Liên hệ  </Link>
        </div>



        <Dropdown overlay={user?.admin ? adminMenu : user ? userMenu : Regis} trigger={['click']}>
          <Button className="">
            {user ? user.username : "Khách"} <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
