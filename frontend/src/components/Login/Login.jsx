import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/apiRequest';

import {useDispatch} from 'react-redux'
const Login = () => {
    const [username, setUsername]= useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const handleSignUpClick = () => {
    navigate('/register'); 
  };
  const handleLogin = (e)=>{
    e.preventDefault();
    const newUser={
        username:username,
        password:password,
    }
    loginUser(newUser,dispatch,navigate)

  }
  

  return (
    <div className="h-screen  flex justify-center items-start pt-28">
      <div className="flex max-w-5xl w-full mx-4 bg-white shadow-lg scale-110 rounded-sm max-h-5xl">
        <div className="flex-1 bg-white p-10 h-[25rem] overflow-auto">
          <form onSubmit={handleLogin}>
            <label htmlFor="username" className="block mb-2 text-gray-700">
              USERNAME
            </label>
            <input type="text" placeholder="Your username.." className="w-full p-2 mb-4 border border-gray-300 rounded" onChange={(e)=>setUsername(e.target.value)}  />
            <label htmlFor="password" className="block mb-2 text-gray-700">
              PASSWORD
            </label>
            <input type="password" placeholder="Your password.." className="w-full p-2 mb-6 border border-gray-300 rounded" onChange={(e)=>setPassword(e.target.value)}  />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
            >
              SIGN IN
            </button>
          </form>
        </div>
        <div
          className="flex-1 bg-cover bg-center text-white p-8 flex flex-col justify-center text-center"
          style={{   backgroundImage:   "url('https://autopro8.mediacdn.vn/2019/6/9/nintchdbpict000494096806-15600674876381793480347.jpg')", }}  >
          <h1 className="text-3xl font-bold mb-4">Sign In</h1>
          <p className="mb-8 ">
            Vui lòng điền đầy đủ thông tin .
          </p>
          <button className="px-6 py-2 border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
          onClick={handleSignUpClick}>
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
