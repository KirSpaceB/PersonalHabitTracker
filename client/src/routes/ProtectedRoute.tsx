import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  // Im still able to access Protect components even with this here
  // The idea is that sessionStorage is sotred on the web
  // So Protected Route is working becasue if we set this to false it redicts correctly
  // Found the issue so when user does not initially login he cannot access the protected routes, but when user logs in and out he can access the protected routes. However is browser is closed and reopened the SESSION ENDS leading to user needs to login to get a new session token
  let isAuth = sessionStorage.getItem('token')
  if(!isAuth) {
    console.log('%c THERE IS NO SESSION TOKEN IN PROTECTED ROUTE', 'color:red;')
  }

  return (
    isAuth ? <Outlet/> : <Navigate to={'/'} replace/> 
  )
}

export default ProtectedRoute