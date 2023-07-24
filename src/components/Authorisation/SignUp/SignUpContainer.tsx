import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import { AppDispatch, StateType } from 'redux/store';
import { signUpUserTh } from 'redux/auth-reducer';
import { UserSignUpType } from 'types/types';
import SignUp from 'components/Authorisation/SignUp/SignUp';

let SignUpContainer: React.FC = () => {
  const userId = useSelector((state: StateType) => state.auth.userId);
  const requestErrors = useSelector(
    (state: StateType) => state.auth.requestErrors
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSignUpUser = (userCredentials: UserSignUpType) => {
    dispatch(signUpUserTh(userCredentials));
  };

  return userId ? (
    <Navigate to='/profiles' replace={true} />
  ) : (
    <SignUp signUpUser={handleSignUpUser} requestErrors={requestErrors} />
  );
};

export default SignUpContainer;
