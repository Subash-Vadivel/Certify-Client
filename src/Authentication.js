import axios from './api/axiosPrivate'
import React, { useContext,  useState } from 'react'
export const userStatus=React.createContext();
export default function Authentication(props) {
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('user')));

    const login=async(payload,setOpen)=>{
        try{
      const result=await axios.post('/accounts/login',payload);
      
      console.log(result);
      localStorage.setItem('user',JSON.stringify(result.data.user));
        setUser(result.data.user);
        setOpen(false);
        }
        catch(err){
            console.log(err);
        }
      
    }

    const logout=async()=>{   
    //   await axios.get('/accounts/logout').then(()=>{
    //     setUser(false);
    //     localStorage.removeItem('user')
    //   }).catch((err)=>{
    //     console.log(err);
    //   })
    setUser(false);
        localStorage.removeItem('user')

    }
  return (
    <>  
          <userStatus.Provider value={{user,login,logout}}>
            {props.children}
          </userStatus.Provider>
    
    </>
  )
}
export const useAuth=()=>{return useContext(userStatus)};