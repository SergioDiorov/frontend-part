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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileData, setProfileData] =
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
      {showEditModal && profileData && (
        <EditProfileModal
          profileData={profileData}
          setShowEditModal={setShowEditModal}
        />
      )}
      {showDeleteModal && profileData && (
        <DeleteProfileModal
          deleteProfileId={profileData._id}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
      <h1 className={style.title}>Profiles</h1>
      <div className={style.profileCardsContainer}>
        {userProfiles?.map((profile) => (
          <ProfileCard
            key={profile._id}
            profile={profile}
            setShowDeleteModal={setShowDeleteModal}
            setShowEditModal={setShowEditModal}
            setProfileData={setProfileData}
          />
        ))}
        <CreateProfileButton setCreateProfile={setCreateProfile} />
      </div>
    </div>
  );
};
