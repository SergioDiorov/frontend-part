import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';

import { SignIn } from 'components/Authorisation/SignIn/SignIn';

describe('Test SignIn component', () => {
  it('should display the error message when rendered with a `requestErrors` prop', () => {
    render(
      <Router>
        <SignIn signInUser={() => {}} requestErrors='Wrong email' />
      </Router>
    );

    expect(screen.getByText(/Wrong email/)).toBeInTheDocument();
  });

  it('should render SignIn form scuessfuly', () => {
    render(
      <Router>
        <SignIn signInUser={() => {}} requestErrors={null} />
      </Router>
    );

    expect(
      screen.getByRole('heading', { name: 'Sign in' })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should display error messages if form fields are empty', async () => {
    render(
      <Router>
        <SignIn signInUser={() => {}} requestErrors={null} />
      </Router>
    );

    userEvent.click(
      screen.getByRole('button', {
        name: /Sign in/i,
      })
    );

    expect(await screen.findByText('Email is required')).toBeTruthy();
    expect(await screen.findByText('Password is required')).toBeTruthy();
  });
});
