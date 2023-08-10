import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { useEffect, useState } from 'react';

import style from 'components/MainContent/Profiles/Profiles.module.scss';
import { AppDispatch, StateType } from 'redux/store';
import { getUserPrifile, resetProfileAdded } from 'redux/profile-reducer';
import { ProfileDataResponseType } from 'types/profileTypes';
import { AddNewProfileModal } from 'components/MainContent/Profiles/AddNewProfileModal/AddNewProfileModal';
import { EditProfileModal } from 'components/MainContent/Profiles/EditProfileModal/EditProfileModal';
import { DeleteProfileModal } from 'components/MainContent/Profiles/DeleteProfileModal/DeleteProfileModal';
import { ProfileCard } from 'components/MainContent/Profiles/ProfileCard/ProfileCard';
import { CreateProfileButton } from 'components/MainContent/Profiles/CreateProfileButton/CreateProfileButton';

export const Profiles: React.FC = () => {
  const [createProfile, setCreateProfile] = useState(false);
  const [deleteProfileId, setDeleteProfileId] = useState<null | string>(null);
  const [editProfileData, setEditProfileData] =
    useState<null | ProfileDataResponseType>(null);

  const userId = useSelector((state: StateType) => state.auth.userId);
  const profiles = useSelector((state: StateType) => state.profile.profiles);
  const areProfilesChanged = useSelector(
    (state: StateType) => state.profile.areProfilesChanged
  );
  const dispatch = useDispatch<AppDispatch>();

  if (areProfilesChanged && !createProfile && userId) {
    dispatch(resetProfileAdded());
    dispatch(getUserPrifile(userId));
  }

  useEffect(() => {
    if (userId) {
      dispatch(getUserPrifile(userId));
    }
  }, []);

  return userId ? (
    <div className={style.profilesContainer}>
      {createProfile && (
        <AddNewProfileModal
          userId={userId}
          setCreateProfile={setCreateProfile}
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
      <h1 className={style.usersTitle}>Profiles</h1>
      <div className={style.cardContainer}>
        {profiles?.map((profile) => (
          <ProfileCard
            key={profile._id}
            profile={profile}
            setDeleteProfileId={setDeleteProfileId}
            setEditProfileData={setEditProfileData}
          />
        ))}
        <CreateProfileButton setCreateProfile={setCreateProfile} />
      </div>
    </div>
  ) : (
    <Navigate to='/signin' replace={true} />
  );
};
