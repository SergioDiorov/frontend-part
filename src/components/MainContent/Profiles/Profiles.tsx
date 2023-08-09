import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { useEffect } from 'react';

import style from 'components/MainContent/Profiles/Profiles.module.scss';
import { ProfileCard } from 'components/MainContent/Profiles/ProfileCard/ProfileCard';
import { CreateProfileButton } from 'components/MainContent/Profiles/CreateProfileButton/CreateProfileButton';
import { AppDispatch, StateType } from 'redux/store';
import { getUserPrifile } from 'redux/profile-reducer';

export const Profiles: React.FC = () => {
  const userId = useSelector((state: StateType) => state.auth.userId);
  const profiles = useSelector((state: StateType) => state.profile.profiles);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userId) {
      dispatch(getUserPrifile(userId));
    }
  }, []);

  return userId ? (
    <div className={style.profilesContainer}>
      <h1 className={style.usersTitle}>Profiles</h1>
      <div className={style.cardContainer}>
        {profiles?.map((profile) => (
          <ProfileCard key={profile._id} profile={profile} />
        ))}
        <CreateProfileButton />
      </div>
    </div>
  ) : (
    <Navigate to='/signin' replace={true} />
  );
};
