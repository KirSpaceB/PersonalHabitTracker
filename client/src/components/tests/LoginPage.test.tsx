import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import LoginPage from '../LoginPage'
import { postUserLogin } from '../../services/user-auth'
import styles from '../styles/LoginPage.module.css';


jest.mock('../../services/user-auth', () => ({
  postUserLogin: jest.fn(),
}))

describe('LoginPage', () => {
  it('Renders login page', async () => {
    render(<LoginPage/>)
  })
})