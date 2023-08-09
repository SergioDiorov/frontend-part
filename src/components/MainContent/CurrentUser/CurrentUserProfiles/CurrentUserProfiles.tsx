import { useSelector } from 'react-redux';

import style from 'components/MainContent/CurrentUser/CurrentUserProfiles/CurrentUserProfiles.module.scss';
import { ProfileCard } from 'components/MainContent/Profiles/ProfileCard/ProfileCard';
import { CreateProfileButton } from 'components/MainContent/Profiles/CreateProfileButton/CreateProfileButton';
import { StateType } from 'redux/store';

export const CurrentUserProfiles: React.FC = () => {
  const userProfiles = useSelector(
    (state: StateType) => state.currentUser.userProfiles
  );

  if (!userProfiles?.length) {
    return <h1 className={style.noProfilesTitle}>User has no profiles yet</h1>;
  }

  return (
    <div className={style.profilesContainer}>
      <h1 className={style.title}>Profiles</h1>
      <div className={style.profileCardsContainer}>
        {userProfiles?.map((profile) => {
          return <ProfileCard key={profile._id} profile={profile} />;
        })}
        <CreateProfileButton />
      </div>
    </div>
  );
};
