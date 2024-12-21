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
    <main className="flex flex-col items-center justify-center bg-gray-200 h-[600px] w-[60%] text-center mt-12 mx-auto">
        <div className="mt-4 text-2xl font-bold">User List</div>
        <div className="flex justify-center flex-wrap items-center mt-4">
            {Array.isArray(userList) && userList.length > 0 ? (
                userList.map((user, index) => (
                    <div key={index} className="flex flex-col items-center justify-center w-48 m-6">
                        <div className="bg-gray-400 p-2 rounded-lg text-white">{user.username}</div>
                        <div
                            className="mt-4 text-base bg-pink-600 text-white px-2 py-1 rounded-lg cursor-pointer hover:bg-pink-700"
                            onClick={() => {
                                handleDelete(user._id);
                            }}
                        >
                            Delete
                        </div>
                    </div>
                ))
            ) : (
                <div>No users found.</div>
            )}
        </div>
    </main>
);

};

export default QLUser;
