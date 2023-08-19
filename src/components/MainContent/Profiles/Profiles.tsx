import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { useEffect, useState } from 'react';

import style from 'components/MainContent/Profiles/Profiles.module.scss';
import { AppDispatch, StateType } from 'redux/store';
import { getUserProfile, resetProfileAdded } from 'redux/profile-reducer';
import { ProfileDataResponseType } from 'types/profileTypes';
import { AddNewProfileModal } from 'components/MainContent/Profiles/AddNewProfileModal/AddNewProfileModal';
import { EditProfileModal } from 'components/MainContent/Profiles/EditProfileModal/EditProfileModal';
import { DeleteProfileModal } from 'components/MainContent/Profiles/DeleteProfileModal/DeleteProfileModal';
import { ProfileCard } from 'components/MainContent/Profiles/ProfileCard/ProfileCard';
import { CreateProfileButton } from 'components/MainContent/Profiles/CreateProfileButton/CreateProfileButton';
import { Pagination } from 'components/common/Pagination/Pagination';
import { ProfileSearch } from 'components/MainContent/Profiles/ProfileSearch/ProfileSearch';
import { ProfileFilters } from 'components/MainContent/Profiles/ProfileFilters/ProfileFilters';
import usePagination from 'assets/pagination/usePagination';

export const Profiles: React.FC = () => {
  const [createProfile, setCreateProfile] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isNameSearch, setNameSearch] = useState(false);
  const [profileData, setProfileData] =
    useState<null | ProfileDataResponseType>(null);

  const userId = useSelector((state: StateType) => state.auth.userId);
  const profiles = useSelector((state: StateType) => state.profile.profiles);
  const areProfilesChanged = useSelector(
    (state: StateType) => state.profile.areProfilesChanged
  );
  const dispatch = useDispatch<AppDispatch>();

  const {
    paginatedArray,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
    resetPages,
  } = usePagination(profiles?.length ? profiles : []);

  useEffect(() => {
    if (areProfilesChanged && !createProfile && userId) {
      dispatch(resetProfileAdded());
      dispatch(getUserProfile(userId));
    }
  }, [areProfilesChanged]);

  useEffect(() => {
    if (userId) {
      dispatch(getUserProfile(userId));
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
      <h1 className={style.usersTitle}>Profiles</h1>
      <div className={style.filterContainer}>
        <ProfileSearch userId={userId} setNameSearch={setNameSearch} />
        <ProfileFilters
          userId={userId}
          resetPages={resetPages}
          isNameSearch={isNameSearch}
          setNameSearch={setNameSearch}
        />
      </div>
      <div className={style.cardContainer}>
        {paginatedArray?.map((profile) => (
          <ProfileCard
            key={profile._id}
            profile={profile}
            setShowDeleteModal={setShowDeleteModal}
            setShowEditModal={setShowEditModal}
            setProfileData={setProfileData}
          />
        ))}
        {currentPage === totalPages && (
          <CreateProfileButton setCreateProfile={setCreateProfile} />
        )}
      </div>

      {paginatedArray && !!paginatedArray.length && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </div>
  ) : (
    <Navigate to='/signin' replace={true} />
  );
};
