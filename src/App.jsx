import React, { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import authService from "./appwrite/auth"
import {login,logout} from "./store/authSlice"
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
// import {outlet} from "react-router-dom";

import './App.css'

function App() {
  const [loading,setLoading]=useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(!userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
      
    })
    .finally(()=>setLoading(false))
  },[]);


//conditional rendering krenge ki agr loading true hai toh loading displayk krenge
// nahi to kuch or
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-centre bg-gray-400'>
      <div className='w-full block'>
             <Header/> 
             <main>
              
             </main>
             <Footer/>
      </div>

    </div>
  ):null
}

export default App
