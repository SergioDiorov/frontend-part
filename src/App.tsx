import style from './App.module.scss';
import { Route, Routes, useLocation } from 'react-router';
import SignIn from './components/Authorisation/SignIn/SignIn';
import SignUpContainer from './components/Authorisation/SignUp/SignUpContainer';

let App: React.FC = () => {
  let location = useLocation();

  return (
    <div className={style.appContaier}>
      {!(location.pathname === '/signin' || location.pathname === '/signup') &&
        '<Sidebar></Sidebar>'}
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUpContainer />} />
        <Route path='/profiles' element={'<Profiles />'} />
        <Route path='/users' element={'<Users />'} />
        <Route path='/dashboard' element={'<Dashboard />'} />
      </Routes>
    </div>
  );
};

export default App;
