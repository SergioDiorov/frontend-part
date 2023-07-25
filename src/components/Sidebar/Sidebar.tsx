import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';

import { signOutUserTh } from 'redux/auth-reducer';

let Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      {'<Sidebar>'}
      <button onClick={() => dispatch(signOutUserTh())}>Sign out</button>
      {'</Sidebar>'}
    </>
  );
};

export default Sidebar;
