// Import the required libraries and components
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter,Routes,Route } from 'react-router-dom';
import {create} from 'react-test-renderer'
import App from './App';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import HabitTrackerUI from './components/HabitTrackerUI';
import ProtectedRoute from './routes/ProtectedRoute';


describe('Check if my app is rendering', () => {
  it('renders correctly',() => {
    let renderer = create (
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path='/' element={<LoginPage/>}></Route>
          <Route path='SignUp' element={<SignUpPage/>}></Route>
          <Route element={<ProtectedRoute/>}>
            <Route path='HabitTracker/Home' element={<HabitTrackerUI/>}></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    )
  })
})