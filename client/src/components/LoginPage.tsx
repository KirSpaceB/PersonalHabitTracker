import styles from '../styles/LoginPage.module.css';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigateToHome = useNavigate()

  
  return (
    <>
        <div className={styles.LoginPage_container}>
          <div className={styles.LoginPage_userInfoContainer}>

            <h1 className={styles.LoginPage_title}>Habit Tracker</h1>
            
            <div className={styles.LoginPage_userEmailContainer}>
              <input></input>
            </div>

            <div className={styles.LoginPage_userPasswordContainer}>
              <input></input>
            </div>

            <div className={styles.LoginPage_btnContainer}>
              <button className={styles.LoginPage_loginBtn}>Login</button>
            </div>

          </div>
        </div>
      
    </>
  )
}

export default LoginPage