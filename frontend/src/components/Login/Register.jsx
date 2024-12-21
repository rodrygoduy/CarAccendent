import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  { regisUser } from '../../redux/apiRequest';
import {useDispatch} from 'react-redux'

const Regis = () => {
  const [username, setUsername]= useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/login'); 
    
  };
  const handleRegister =(e)=>{
    e.preventDefault();
  const newUser={
      username:username,
      email:email,
      password:password,
  }
  regisUser(newUser,dispatch,navigate)
  }
  return (
    <div className="h-screen  flex justify-center items-start pt-28">
      <div className="flex max-w-5xl w-full mx-4 bg-white shadow-lg scale-110 rounded-sm max-h-5xl">
        <div
          className="flex-1 bg-cover bg-center text-white p-8 flex flex-col justify-center text-center"
          style={{  backgroundImage:  "url('https://image.congan.com.vn/thumbnail/CATP-4095-2023-2-14/anh-8_1.jpg')", }}>
          <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
          <p className="mb-8">
            Vui lòng điền đầy đủ thông tin để trở thành một phần trong cộng đồng.
          </p>
          <button className="px-6 py-2 border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
          onClick={handleSignInClick}>
            SIGN IN
          </button>
        </div>
        <div className="flex-1 bg-white p-10 h-[25rem] overflow-auto">
          <form onSubmit={handleRegister}>
            
            <label htmlFor="username" className="block mb-2 text-gray-700">
              USERNAME
            </label>
            <input  type="text"  placeholder="Your username.."  className="w-full p-2 mb-4 border border-gray-300 rounded" onChange={(e)=>setUsername(e.target.value)}
            />

            <label htmlFor="email" className="block mb-2 text-gray-700">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email.."
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              onChange={(e)=>setEmail(e.target.value)}
            />

            <label htmlFor="password" className="block mb-2 text-gray-700">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your password.."
              className="w-full p-2 mb-6 border border-gray-300 rounded"
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Regis;
