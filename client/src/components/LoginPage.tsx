import styles from '../styles/LoginPage.module.css';
import { Form, useNavigate } from "react-router-dom";
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

  //Fetch API Connection to backend


  // Create a variable to determine weather the user is in the db
  const validateLogin = () => {
    let userAuthentication = true

    if(!loginInfo.userName) {
      userAuthentication = false
    }
    return userAuthentication
  }
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetch("http://127.0.0.1:5000/user-auth")
    .then(response => response.json())
    .then(data => {
      console.log(loginInfo)
      console.log(data)
      let matchFound = false;
      for(let i = 0; i < data.length; i++) {
        if(data[i][0] === loginInfo.userName && data[i][1] === loginInfo.password) {
          matchFound = true;
          break;
        }
      }
      if(matchFound) {
        console.log('Login successful');
        navigateHook('HabitTracker/Home')

      } else {
        alert('Invalid username or password');
      }
    })
  }

  //Review
  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
              <FormInput type="password" name="password" value={loginInfo.password} onChange={handleUserInput} placeholder='password' />
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