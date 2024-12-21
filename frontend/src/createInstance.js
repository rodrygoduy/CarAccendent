import axios from "axios";
import  { jwtDecode } from "jwt-decode"

const refeshToken = async()=>{
    try{
        const res = await axios.post('/auth/refesh',{
            withCredentials:true
        })
        return res.data
    }catch(err){
        console.log(err)
    }
  }
export const createAxios = (user,dispatch,stateSuccess)=>{
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async(config)=>{
            let date = new Date()
            const decodedToken = jwtDecode(user?.accessToken);
            if(decodedToken.exp< date.getTime()/1000){
                const data = await refeshToken()
                const refeshUser ={
                    ...user,
                    accessToken:data.accessToken,
                }
                dispatch(stateSuccess(refeshUser))
                config.headers['token']='Bearer'+ data.accessToken
            }
            return config
        },(err)=>{ return Promise.reject(err)}
      )
      return newInstance
}