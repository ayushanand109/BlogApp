import React from 'react'
import {useDispatch } from 'react-redux';
import authService from "../../appwrite/auth"
import {logout} from "../../store/authSlice"

function LogoutBtn() {

    const dispatch=useDispatch();
    const logoutHandler=()=>{
        //logur apne aap me ek promise hai
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button className='inline-block px-6 py-2.5 duration-200 hover:bg-red-600 rounded-full' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn