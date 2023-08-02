import { Route, Routes, useLocation, Navigate } from 'react-router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType } from 'redux/store';

import style from 'App.module.scss';
import { SignUpContainer } from 'components/Authorisation/SignUp/SignUpContainer';
import { SignInContainer } from 'components/Authorisation/SignIn/SignInContainer';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { Profiles } from './components/MainContent/Profiles/Profiles';
import { Users } from 'components/MainContent/Users/Users';
import { Dashboard } from 'components/MainContent/Dashboard/Dashboard';
import { Preloader } from 'components/common/Preloader/Preloader';
import { CurrentUser } from 'components/MainContent/CurrentUser/CurrentUser';
import { checkUserAuthTh } from 'redux/auth-reducer';
import { getUserByIdTh } from 'redux/signed-user-reducer';

const App: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: StateType) => state.auth.isLoading);
  const userId = useSelector((state: StateType) => state.auth.userId);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkUserAuthTh());
    }
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(getUserByIdTh(userId));
    }
  }, [userId]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className={style.appContaier}>
      {!(
        location.pathname === '/signin' || location.pathname === '/signup'
      ) && <Sidebar />}
      <div className={style.mainContentContainer}>
        <Routes>
          <Route path='/' element={<Navigate to='/profiles' />} />
          <Route path='/signin' element={<SignInContainer />} />
          <Route path='/signup' element={<SignUpContainer />} />
          <Route path='/profiles' element={<Profiles />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/:id' element={<CurrentUser />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
