import LoginPage from "./components/LoginPage";
import HabitTrackerUI from "./components/HabitTrackerUI";
import SignUpPage from "./components/SignUpPage";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<LoginPage/>}
          />
          
          <Route
          path="SignUp"
          element={<SignUpPage/>}
          />
          
          <Route element={<ProtectedRoute/>}>
            {/* Add Routes you want to protect  */}
            <Route path="HabitTracker/Home" element={<HabitTrackerUI/>}></Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App