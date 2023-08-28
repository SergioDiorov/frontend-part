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
import { ProfileResultMessage } from 'assets/informationMessages/profileResultMessage';

type CurrentUserProfilesProps = {
  userId: string;
};

export const CurrentUserProfiles: React.FC<CurrentUserProfilesProps> = ({
  userId,
}) => {
  const userProfiles = useSelector(
    (state: StateType) => state.currentUser.userProfiles
  );
  const isProfileFulfilled = useSelector(
    (state: StateType) => state.profile.isProfileFulfilled
  );
  const isOutcome = useSelector((state: StateType) => state.profile.isOutcome);

  const [createProfile, setCreateProfile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileData, setProfileData] =
    useState<null | ProfileDataResponseType>(null);

  return (
    <div className={style.profilesContainer}>
      {isOutcome && <ProfileResultMessage error={!isProfileFulfilled} />}
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
      <h1 className={style.title}>
        {userProfiles?.length ? 'Profiles' : 'User has no profiles yet'}
      </h1>
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
