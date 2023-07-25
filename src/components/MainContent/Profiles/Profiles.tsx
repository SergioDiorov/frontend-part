import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { StateType } from 'redux/store';

const Profiles: React.FC = () => {
  const userId = useSelector((state: StateType) => state.auth.userId);

  return userId ? <>Profiles page</> : <Navigate to='/signin' replace={true} />;
};

export default Profiles;
