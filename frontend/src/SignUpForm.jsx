import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";




function SignUpForm(){
    const[emailError, setEmailError] = useState('');
    const[passError, setPassError] =  useState('');
    const[user, setUser] = useState('');

    
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        navigate('/');
    }
    
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPass, setConfirmPass] = useState('');
    const[checkConfirmPass, setCheckConfirmPass] = useState('');

    const handleConfirmPass = (e) => {
        setConfirmPass(e.target.value);
    }
  
    const handleEmail = (e) => {
      setEmail(e.target.value);
      setEmailError('');
      setPassError('');
      setUser('');
      setCheckConfirmPass('');
    }
  
    const handlePassword = (e) => {
      setPassword(e.target.value);
      setEmailError('');
      setPassError(''); 
      setUser('');
      setCheckConfirmPass('');
    }

    const handlePost = async (e) => {
        e.preventDefault();
        if(password === confirmPass){
            try {
                const response = await axios.post('http://localhost:3000/user/signUp', 
                {email: email, password: password},
                {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                },
                );
                if(response.status === 200){
                    window.location.reload();
                }
              } catch (error) {
                setEmail('');
                setPassword('');
                setConfirmPass('');
                if(error.response.data.message === `"email" must be a valid email`){
                  setEmailError("Invalid Email");
                }
                if(error.response.data.message === `"password" length must be at least 6 characters long`){
                  setPassError("Password must be 6 character long.");
                }

                if(error.response.data.message === 'Email already exist'){
                  setUser('Already Exist');
                }
              }
        }
        else{
            setCheckConfirmPass("The given password is not equal to confirm password.")
        }
      };

    return(
        <>
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" value={email} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={handleEmail}/>
                      <p className="text-orange-800 mt-[0.5rem]">{emailError}</p>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" value={password} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handlePassword}/>
                      <p className="text-orange-800 mt-[0.5rem]">{passError}</p>
                  </div>
                  <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="password" name="confirm-password" value={confirmPass} id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleConfirmPass}/>
                      <p className="text-orange-800 mt-[0.5rem]">{passError}</p>
                      <p className="text-orange-800 mt-[0.5rem]">{checkConfirmPass}</p>
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <p className="text-orange-800 mt-[0.5rem]">{user}</p>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handlePost}>Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={handleSignIn}>Login here</a>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section></>
    )
}

export default SignUpForm