import { Route, Routes, useLocation } from 'react-router';

import style from 'App.module.scss';
import SignUpContainer from 'components/Authorisation/SignUp/SignUpContainer';
import SignInContainer from 'components/Authorisation/SignIn/SignInContainer';

let App: React.FC = () => {
  let location = useLocation();

  return (
    <div className={style.appContaier}>
      {!(location.pathname === '/signin' || location.pathname === '/signup') &&
        '<Sidebar></Sidebar>'}
      <Routes>
        <Route path='/signin' element={<SignInContainer />} />
        <Route path='/signup' element={<SignUpContainer />} />
        <Route path='/profiles' element={'<Profiles />'} />
        <Route path='/users' element={'<Users />'} />
        <Route path='/dashboard' element={'<Dashboard />'} />
      </Routes>
    </div>
  );
};

export default App;
