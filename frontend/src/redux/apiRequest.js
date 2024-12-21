import axios from 'axios'
import { loginFailed, loginStart, loginSuccess, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from './authSlice'
import { notification } from 'antd';
import { deleteUserFailed, deleteUserStart, deleteUserSuccess, getUsersFailed, getUsersStart, getUsersSuccess } from './userSlice';
export const loginUser = async(user , dispatch,navigate)=>{
    dispatch(loginStart())
    try{
        const res = await axios.post('/auth/login',user)
        dispatch(loginSuccess(res.data))
        notification.success({
            message: 'Success',
            description: `Đã đăng nhập thành công`,
            placement: 'topRight'
          });
        navigate('/')
    }catch(err){
        dispatch(loginFailed())
        notification.error({
            message: 'Failed',
            description: 'Hãy thử lại tài khoản hoặc mật khẩu',
            placement: 'topRight',
        });
    }
}
export const regisUser = async(user,dispatch,navigate)=>{
    dispatch(registerStart())
    try{
        await axios.post('/auth/register',user)
        dispatch(registerSuccess())
        navigate('/login');
        notification.success({
            message: 'Success',
            description: `Đã kí thành công`,
            placement: 'topRight'
          });
    }catch(err){
        dispatch(registerFailed())
        notification.error({
            message: 'Failed',
            description: 'Mật khẩu phải có ít nhất 6 kí tự',
            placement: 'topRight',
        });
    }
}
export const getAllUsers = async(accessToken,dispatch,axiosJWT)=>{
    dispatch(getUsersStart());
    try{
        const res = await axiosJWT.get('/quanli/user',{
            headers:{
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(getUsersSuccess(res.data))
    }catch(err){
        dispatch(getUsersFailed())
    }
}
export const deleteUser = async(accessToken,dispatch,id,axiosJWT)=>{
    dispatch(deleteUserStart());
    try{
        const res = await axiosJWT.delete('/quanli/user/'+id,{
            headers:{
                token: `Bearer ${accessToken}`
            } 
        })
        dispatch(deleteUserSuccess())
        notification.success({
            message: 'Success',
            description: `Đã xóa người dùng thành công!`,
            placement: 'topRight'
          });
        dispatch(getUsersSuccess(res.data))
    }catch(err){
        dispatch(deleteUserFailed())
    }
}
export const logOut = async(dispatch,id,navigate,accessToken,axiosJWT)=>{
    dispatch(logoutStart())
    try{
        await axiosJWT.post('/auth/logout',id,{
            headers:{token:`Bearer ${accessToken}`}
        })
        console.log("Access Token:", accessToken);
console.log("User ID:", id);

        dispatch(logoutSuccess())
        notification.success({
            message: 'Success',
            description: `Đã đăng xuất`,
            placement: 'topRight'
          });
          navigate('/')
    }catch(err){
        dispatch(loginFailed())
        notification.error({
            message: 'Failed',
            description: 'Logout thất bại',
            placement: 'topRight',
        });
    }
}