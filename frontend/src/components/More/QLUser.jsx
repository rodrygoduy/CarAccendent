import React, { useEffect } from "react";
import { deleteUser, getAllUsers } from "../../redux/apiRequest";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/authSlice";
const QLUser = () => {
    
    const user = useSelector((state)=>state.auth.login?.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
  const userList = useSelector((state)=>state.user.users?.allUsers)
let axiosJWT = createAxios(user,dispatch,loginSuccess)
  
  const handleDelete= (id)=>{
    deleteUser(user?.accessToken,dispatch,id,axiosJWT)
  }

  useEffect(()=>{
    if(!user){
        navigate("/")
    }
    if(user?.accessToken){
        getAllUsers(user?.accessToken,dispatch,axiosJWT)
    }
    
  },[])
  return (
    <main className="flex flex-col items-center justify-center bg-gray-100  px-4">

            <div className="text-3xl font-bold text-gray-800 mb-8">Danh sách người dùng</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                {Array.isArray(userList) && userList.length > 0 ? (
                    userList.map((user, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-between transform transition-transform hover:scale-105"
                        >
                            <div className="text-xl font-semibold text-gray-700 mb-2">{user.username}</div>
                            <button
                                className="mt-4 text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                onClick={() => handleDelete(user._id)}
                            >
                                Xóa
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500 text-lg">Không có người dùng nào được tìm thấy.</div>
                )}
            </div>
            </main>
);

};

export default QLUser;
