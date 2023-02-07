import styles from '../styles/LoginPage.module.css';
import { GoogleLogin } from '@react-oauth/google';
const LoginPage = () => {

  


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
            <GoogleLogin 
            onSuccess={() => {
              console.log('Login Success')
            }}
            onError={() => {
              console.log('Login Error')
            }}></GoogleLogin>
          </div>

        </div>
      </div>
    </>
  )
}

export default LoginPage