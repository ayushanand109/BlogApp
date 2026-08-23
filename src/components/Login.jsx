import React, {useState} from 'react'
import {Link, useNavigate, UseNavigate} from "react-router-dom"
import {login as authLogin} from '../store/authSlice'
import {Button,Input, Logo} from "./index"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth' 
import {useForm} from "react-hook-form"
function Login() {
    const dispatch=useDispatch();
    const [register, handleSubmit ]=useForm();
    const navigate=useNavigate();
    const [error,setError]=useState();

    const login=async(data)=>{
        //login kr rhe to sabse pehle error ko empty out krenge
        setError("");
        try{
            const session=await authService.login(data);
            if(session){
                const userData=await authService.getCurrentUser();
                if(userData) dispatch(authLogin(userData));
                navigate("/")
                //Link pr khud se navigate ni hota hai uspr click krna padta hai
                // navigte se programmitically navigate krwa skte hai
            }


        }
        catch(error){
            setError(error.message);
           
        }
    }
  return (

    <div className='flex items-center justify-center w-full'>

        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>

                    <Logo width='100%'/>
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'> Sign in to your Account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        //ab yaha dhyan ddo ye handlesubmit jo hai ye useform ka ek method hai. hm humesha onSubmmit me handleSubmit hi use krenge or iske andr hm apna method use krenge.

        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                //ab yaha pr mandatory hai ki hm regiter use kre kyunki hm useForm use kr rhe . ab register ko hm humesha spread krenge ....takki agr ye kahin or bhi use ho raha ho ..to use overwrite na kr paye.
                //register ke andr sabse pehle key deni hoti hai or uske baad object
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login