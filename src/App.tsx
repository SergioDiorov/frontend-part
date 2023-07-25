import { Route, Routes, useLocation } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType } from 'redux/store';

import style from 'App.module.scss';
import SignUpContainer from 'components/Authorisation/SignUp/SignUpContainer';
import SignInContainer from 'components/Authorisation/SignIn/SignInContainer';
import Sidebar from 'components/Sidebar/Sidebar';
import Profiles from './components/MainContent/Profiles/Profiles';
import { checkUserAuthTh } from 'redux/auth-reducer';

const App: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: StateType) => state.auth.isLoading);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkUserAuthTh());
    }
  }, []);

  if (isLoading) {
    return <>--Preloader--</>;
  }

  return (
    <div className={style.appContaier}>
      {!(
        location.pathname === '/signin' || location.pathname === '/signup'
      ) && <Sidebar />}
      <Routes>
        <Route path='/signin' element={<SignInContainer />} />
        <Route path='/signup' element={<SignUpContainer />} />
        <Route path='/profiles' element={<Profiles />} />
        <Route path='/users' element={'<Users />'} />
        <Route path='/dashboard' element={'<Dashboard />'} />
      </Routes>
    </div>
  );
};

export default App;
