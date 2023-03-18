import styles from '../styles/LoginPage.module.css';
import { Form, useNavigate, redirect } from "react-router-dom";
import FormInput from './FormInput';
import { useState } from 'react';

const LoginPage = () => {

  const navigateHook = useNavigate()
  const handleSignUpNavigation = () => {
    navigateHook('SignUp')
  }
  // Change state whenever input mutates
  const [loginInfo, setLoginInfo] = useState({
    userName:'',
    password:'',
  })
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(loginInfo)
    
    fetch("http://127.0.0.1:5000/user-auth", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:5173",
        "Access-Control-Allow-Credentials": "http://localhost:5174",
      },
      credentials:'include',
      body: JSON.stringify(loginInfo)
    }).then((response) => {
      // Always have to return the response, and we always have to jsonify it
      return response.json()
    }).then((data) => {
      const stringifyData = JSON.stringify(data)
      console.log(stringifyData)
      sessionStorage.setItem('token', stringifyData)
      // since js returns an object we always have to treat the reponse like an object?
      if(data) {
        navigateHook('HabitTracker/Home')
      } else {
        alert('wrong username or password')
      }
    })
  }

  //Review
  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // Object destructuring
    const {name,value} = event.target
    setLoginInfo({...loginInfo, [name]:value});
  }

  return (
    <>
        <div className={styles.LoginPage_container}>
          <div className={styles.LoginPage_userInfoContainer}>

            <h1 className={styles.LoginPage_title}>Habit Tracker</h1>

            <form onSubmit={handleSubmit}>
              <FormInput type="text" name="userName" value={loginInfo.userName} onChange={handleUserInput} placeholder='UserName'/>
              <FormInput type="password" name="password" value={loginInfo.password} onChange={handleUserInput} placeholder='password'/>
              <input type='submit'></input>
            </form>

            <div className={styles.LoginPage_signUp}>
              <button onClick={handleSignUpNavigation} className={styles.LoginPage_signUpBtn}>Sign Up</button>
            </div>

          </div>
        </div>
    </>
  )
}

export default LoginPage