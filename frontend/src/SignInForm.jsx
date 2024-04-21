import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function SignInForm(){

  const navigate = useNavigate();

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[emailError, setEmailError] = useState('');
  const[passError, setPassError] =  useState('');
  const[emailPassError, setEmailPassError] = useState('');
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError('');
    setPassError('');
    setEmailPassError('');
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setEmailError('');
    setPassError('');
    setEmailPassError('');
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/signIn', 
      {email: email, password: password},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      );
      if (response.status === 200) {
        window.location.href = 'http://localhost:5500/';
      } else {
        console.log("Error");
      }
    } catch (error) {
      if(error.response.data.message === `"email" must be a valid email`){
        setEmailError("Invalid Email");
      }

      if(error.response.data.message === `"password" length must be at least 6 characters long`){
        setPassError("Password Must Be 6 Characters long.");
      }

      if(error.response.data.message === `Invalid email or password`){
        setEmailPassError('Invalid email or password');
      }
      setEmail('');
      setPassword('');
    }
  };


  const handleSignUp = (e) => {
    e.preventDefault();
    navigate('/signup');
  }
  
  return(
    <>
    <section className="bg-gray-50 dark:bg-gray-900">
<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    value={email} placeholder="name@company.com" required="" onChange={handleEmail}/>
                    <p className="text-orange-800 mt-[0.5rem]">{emailError}</p>
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={password} onChange={handlePassword}/>
                    <p className="text-orange-800 mt-[0.5rem]">{passError}</p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                        </div>
                    </div>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </div>
                <p className="text-orange-800 mt-[0.5rem]">{emailPassError}</p>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handlePost}>Sign in</button>
                <div class="px-6 sm:px-0 max-w-sm">
    <button type="button" class="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"><svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg><a href="http://localhost:4000/auth/google">Sign up with Google</a><div></div></button>
</div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={handleSignUp}>Sign up</a>
                </p>
            </form>
        </div>
    </div>
</div>
</section>


  </>
  )
}

export default SignInForm