import { connect } from 'react-redux';
import { StateType } from '../../../redux/store';
import { UserSignInType } from '../../../types/types';
import { signInUserTh } from './../../../redux/auth-reducer';
import SignIn from './SignIn';
import { Navigate } from 'react-router';

type MapStateToPropsType = {
  userId: string | null;
  requestErrors: string | null;
};

type MapDispatchToPropsType = {
  signInUserTh: (data: UserSignInType) => void;
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

let SignUpContainer: React.FC<PropsType> = ({
  userId,
  requestErrors,
  signInUserTh,
}) => {
  return userId ? (
    <Navigate to='/profiles' replace={true} />
  ) : (
    <SignIn signInUser={signInUserTh} requestErrors={requestErrors} />
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
  signInUserTh,
})(SignUpContainer);
