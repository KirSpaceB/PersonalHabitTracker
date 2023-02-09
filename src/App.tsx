import React from "react";
import LoginPage from "./components/LoginPage";
import HabitTrackerUI from "./components/HabitTrackerUI";
import {Route, Routes,} from "react-router-dom"

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>}></Route>
        <Route path="/HabitTracker/Home" element={<HabitTrackerUI/>}></Route>
      </Routes>
    </>
  )
}

export default App