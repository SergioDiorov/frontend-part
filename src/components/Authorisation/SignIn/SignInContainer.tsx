import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import { AppDispatch, StateType } from 'redux/store';
import { signInUserTh } from 'redux/auth-reducer';
import { UserSignInType } from 'types/types';
import SignIn from 'components/Authorisation/SignIn/SignIn';

const SignUpContainer: React.FC = () => {
  const userId = useSelector((state: StateType) => state.auth.userId);
  const requestErrors = useSelector(
    (state: StateType) => state.auth.requestErrors
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSignInUser = (userCredentials: UserSignInType) => {
    dispatch(signInUserTh(userCredentials));
  };

  return userId ? (
    <Navigate to='/profiles' replace={true} />
  ) : (
    <SignIn signInUser={handleSignInUser} requestErrors={requestErrors} />
  );
};

export default SignUpContainer;
