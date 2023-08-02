import { useLocation } from 'react-router';

import style from 'components/MainContent/CurrentUser/CurrentUser.module.scss';
import { CurrentUserCard } from './CurrentUserCard/CurrentUserCard';

export const CurrentUser: React.FC = () => {
  const { state } = useLocation();

  return (
    <div className={style.currentUserContainer}>
      <CurrentUserCard
        userName={state.userName}
        email={state.email}
        isAdmin={state.isAdmin}
      />
      <div className={style.profilesContainer}>
        <h1 className={style.title}>Profiles</h1>
      </div>
    </div>
  );
};
