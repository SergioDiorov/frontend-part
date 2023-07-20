import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import SignUp from 'components/Authorisation/SignUp/SignUp';

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

  it('should render SignUp form scuessfuly', () => {
    render(
      <Router>
        <SignUp signUpUser={() => {}} requestErrors={null} />
      </Router>
    );

    expect(
      screen.getByRole('heading', { name: 'Sign up' })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('User name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
  });

  it('should display error messages if form fields are empty', async () => {
    render(
      <Router>
        <SignUp signUpUser={() => {}} requestErrors={null} />
      </Router>
    );

    userEvent.click(
      screen.getByRole('button', {
        name: /Sign up/i,
      })
    );

    expect(await screen.findByText('User name is required')).toBeTruthy();
    expect(await screen.findByText('Email is required')).toBeTruthy();
    expect(await screen.findByText('Password is required')).toBeTruthy();
  });
});
