import { connect } from 'react-redux';
import { Navigate } from 'react-router';

import { StateType } from 'redux/store';
import { UserSignUpType } from 'types/types';
import { signUpUserTh } from 'redux/auth-reducer';
import SignUp from 'components/Authorisation/SignUp/SignUp';

type MapStateToPropsType = {
  userId: string | null;
  requestErrors: string | null;
};

type MapDispatchToPropsType = {
  signUpUserTh: (data: UserSignUpType) => void;
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

let SignUpContainer: React.FC<PropsType> = ({
  userId,
  requestErrors,
  signUpUserTh,
}) => {
  return userId ? (
    <Navigate to='/profiles' replace={true} />
  ) : (
    <SignUp signUpUser={signUpUserTh} requestErrors={requestErrors} />
  );
};

let mstp = (state: StateType): MapStateToPropsType => ({
  userId: state.authReducer.userId,
  requestErrors: state.authReducer.requestErrors,
});

export default connect<
  MapStateToPropsType,
  MapDispatchToPropsType,
  {},
  StateType
>(mstp, {
  signUpUserTh,
})(SignUpContainer);
