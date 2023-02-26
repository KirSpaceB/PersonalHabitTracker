import styles from '../styles/LoginPage.module.css';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigateHook = useNavigate()
  const handleClick = () => {
    navigateHook('SignUp')
  }
  

  return (
    <>
        <div className={styles.LoginPage_container}>
          <div className={styles.LoginPage_userInfoContainer}>

            <h1 className={styles.LoginPage_title}>Habit Tracker</h1>
            
            <div className={styles.LoginPage_userEmailContainer}>
              <input placeholder='Username'></input>
            </div>

            <div className={styles.LoginPage_userPasswordContainer}>
              <input placeholder='Password'></input>
            </div>

            <div className={styles.LoginPage_btnContainer}>
              <button className={styles.LoginPage_loginBtn}>Login</button>
            </div>
            <div className={styles.LoginPage_signUp}>
              <button onClick={handleClick} className={styles.LoginPage_signUpBtn}>Sign Up</button>
            </div>

          </div>
        </div>
    </>
  )
}

export default LoginPage