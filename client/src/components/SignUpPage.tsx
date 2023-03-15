// Summary of this code:
// We create a state for formValues, the state is initially an empty object of all the form values, then we change the values by destructuring the object to the event.value(input in the field). This then updates the formValues as the input updates. However we do not want that so we create the function validateForm, we do this in order to stop updating the formValues state variable until validateForm returns a boolean true

import { useEffect, useState } from 'react'
import styles from '../styles/SignUpPage.module.css'
import FormInput from './FormInput'
import { useNavigate } from 'react-router-dom';

// Define an interface for the form values
type FormValues = {
  userName:string;
  password:string;
};

const SignUpPage:React.FC = () => {
  //Navigate to home page after signup button has been pressed
  const useNavigateHook = useNavigate()
  
  // Initialize the formValues state with an object containing empty strings
  const [formValues, setFormValues] = useState<FormValues>({ //Forms Values is the object
    userName:'',
    password:'',
  });
  // Initialize the formErrors state with an object containing empty strings
  const [formErrors, setFormErrors] = useState<FormValues>({
    userName:'',
    password:'',
  })

  const validateForm = () => {
    let isValid = true;
    const errors = {userName: '', password:''};
    //Form validation
    if(!formValues.userName) {
      errors.userName = 'Please Enter name';
      isValid = false;
    }

    if(!formValues.password) {
      errors.password = 'Password not valid'
      isValid = false
    }

    setFormErrors(errors)
    return isValid
  }

  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(validateForm()) {
      console.log(formValues)
      //Gives our data to the backend
      fetch("http://127.0.0.1:5000/user-signup", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(formValues)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          } else {
            useNavigateHook('/')
          }
          return response.json();
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  }
  
  const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setFormValues({...formValues, [name]: value});
    console.log(name)
    console.log(value)
  }

  return(
    <>
      <div className={styles.form_pageBody}>


        <div className={styles.form_container}>
          <form onSubmit={handleSubmit}>

            <h3>Create Account</h3>

            <br />

            <FormInput
            type={'text'}
            placeholder='UserName'
            name='userName'
            value={formValues.userName}
            onChange={handleChange}
            error={formErrors.userName}
            />

            <br/>

            <FormInput
            type={'password'}
            placeholder='Password'
            name='password'
            value={formValues.password}
            onChange={handleChange}
            error={formErrors.password}
            />

            <br/>

            <input type='submit'></input>
          
          </form>
        </div>

      </div>
    </>
  )
}

export default SignUpPage