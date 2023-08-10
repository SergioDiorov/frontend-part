import { useSelector } from 'react-redux';
import { useState } from 'react';

import style from 'components/MainContent/CurrentUser/CurrentUserProfiles/CurrentUserProfiles.module.scss';
import { StateType } from 'redux/store';
import { ProfileDataResponseType } from 'types/profileTypes';
import { AddNewProfileModal } from 'components/MainContent/Profiles/AddNewProfileModal/AddNewProfileModal';
import { EditProfileModal } from 'components/MainContent/Profiles/EditProfileModal/EditProfileModal';
import { DeleteProfileModal } from 'components/MainContent/Profiles/DeleteProfileModal/DeleteProfileModal';
import { ProfileCard } from 'components/MainContent/Profiles/ProfileCard/ProfileCard';
import { CreateProfileButton } from 'components/MainContent/Profiles/CreateProfileButton/CreateProfileButton';

type CurrentUserProfilesProps = {
  userId: string;
};

export const CurrentUserProfiles: React.FC<CurrentUserProfilesProps> = ({
  userId,
}) => {
  const userProfiles = useSelector(
    (state: StateType) => state.currentUser.userProfiles
  );
  const [createProfile, setCreateProfile] = useState(false);
  const [deleteProfileId, setDeleteProfileId] = useState<null | string>(null);
  const [editProfileData, setEditProfileData] =
    useState<null | ProfileDataResponseType>(null);

  if (!userProfiles?.length) {
    return <h1 className={style.noProfilesTitle}>User has no profiles yet</h1>;
  }

  return (
    <div className={style.profilesContainer}>
      {createProfile && (
        <AddNewProfileModal
          setCreateProfile={setCreateProfile}
          userId={userId}
        />
      )}
      {editProfileData && (
        <EditProfileModal
          profileData={editProfileData}
          setEditProfileData={setEditProfileData}
        />
      )}
      {deleteProfileId && (
        <DeleteProfileModal
          deleteProfileId={deleteProfileId}
          setDeleteProfileId={setDeleteProfileId}
        />
      )}
      <h1 className={style.title}>Profiles</h1>
      <div className={style.profileCardsContainer}>
        {userProfiles?.map((profile) => {
          return (
            <ProfileCard
              key={profile._id}
              profile={profile}
              setDeleteProfileId={setDeleteProfileId}
              setEditProfileData={setEditProfileData}
            />
          );
        })}
        <CreateProfileButton setCreateProfile={setCreateProfile} />
      </div>
    </div>
  );
};
