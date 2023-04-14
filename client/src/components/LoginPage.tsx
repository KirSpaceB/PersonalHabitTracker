import styles from '../styles/LoginPage.module.css';
import FormInput from './FormInput';
import { useState } from 'react';
import { postUserLogin } from '../services/user-auth';
import ResuableRoute from './ResuableRoute';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigationHook = useNavigate()

  // Change state whenever input mutates
  const [loginInfo, setLoginInfo] = useState({
    userName:'',
    password:'',
  })
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const response = await postUserLogin(loginInfo)
    console.log("🚀 ~ file: LoginPage.tsx:20 ~ handleSubmit ~ response:", response)

    if(response?.responseStatus !== 500) {
      navigationHook('/HabitTracker/Home')
    } else {
      navigationHook('/');
      alert('Wrong Username or Password')
    }
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

            <form onSubmit={handleSubmit} className={styles.LoginPage_form}>
              <span className={styles.LoginPage_span_tags}>Username</span>
              <FormInput type="text" name="userName" value={loginInfo.userName} onChange={handleUserInput} placeholder='UserName' error={''}/>
              <span className={styles.LoginPage_span_tags}>Password</span>
              <FormInput type="password" name="password" value={loginInfo.password} onChange={handleUserInput} placeholder='password' error={''}/>
              <input type='submit' value={'Login'} 
              className={styles.LoginPage_input_tag}>
              </input>
            </form>
            
            <ResuableRoute route='/SignUp'/>
            
          </div>
        </div>
    </>
  )
}
export default LoginPage