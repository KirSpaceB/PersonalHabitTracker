import React from 'react';
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import LoginPage from '../LoginPage';

describe('LoginPage', () => {
  it('should render a login form', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <LoginPage />
      </Router>
    );

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByRole('textbox', { name: /password/i });
    expect(passwordInput).toBeInTheDocument();

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('should redirect to home page on successful login', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <LoginPage />
      </Router>
    );

    const loginButton = screen.getByRole('button', { name: /login/i });

    act(() => {
      loginButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(history.location.pathname).toBe('/HabitTracker/Home');
  });
});










