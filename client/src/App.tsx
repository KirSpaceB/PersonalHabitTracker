import React from "react";
import LoginPage from "./components/LoginPage";
import HabitTrackerUI from "./components/HabitTrackerUI";
import SignUpPage from "./components/SignUpPage";
import {Route, Routes} from "react-router-dom"
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>}></Route>
        <Route path="SignUp" element={<SignUpPage/>}></Route>
        
        <Route element={<ProtectedRoute/>}>
          {/* Add Routes you want to protect  */}
          <Route path="HabitTracker/Home" element={<HabitTrackerUI/>}></Route>
        </Route>

      </Routes>
    </>
  )
}

export default App