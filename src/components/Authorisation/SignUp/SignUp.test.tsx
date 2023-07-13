import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SignUp from './SignUp';
import userEvent from '@testing-library/user-event';

describe('Test SignUp component', () => {
  it('should display the error message when rendered with a `requestErrors` prop', () => {
    render(
      <Router>
        <SignUp
          signUpUser={() => {}}
          requestErrors='Email is already registered'
        />
      </Router>
    );
    expect(screen.getByText(/Email is already registered/)).toBeInTheDocument();
  });

  it('check the SignUp form rendering', () => {
    render(
      <Router>
        <SignUp signUpUser={() => {}} requestErrors={null} />
      </Router>
    );

    expect(screen.getByText('Sign up')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('User name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('displays error messages for invalid empty form fields', async () => {
    render(
      <Router>
        <SignUp signUpUser={() => {}} requestErrors={null} />
      </Router>
    );

    userEvent.click(
      screen.getByRole('button', {
        name: /submit/i,
      })
    );

    expect(await screen.findByText('User name is required')).toBeTruthy();
    expect(await screen.findByText('Email is required')).toBeTruthy();
    expect(await screen.findByText('Password is required')).toBeTruthy();
  });
});
