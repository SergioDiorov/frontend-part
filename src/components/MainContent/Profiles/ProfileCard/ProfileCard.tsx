import { useState } from 'react';

import style from 'components/MainContent/Profiles/ProfileCard/ProfileCard.module.scss';
import { ProfileDataResponseType } from 'types/profileTypes';
import avatarProfileUser from 'img/assets/avatarProfileUser.png';
import avatarProfileUserWM from 'img/assets/avatarProfileUserWM.png';
import { getFormattedDate } from 'assets/helpers/getFormattedDate';

type ProfilePropType = {
  profile: ProfileDataResponseType;
  setShowDeleteModal: (param: boolean) => void;
  setShowEditModal: (param: boolean) => void;
  setProfileData: (profileData: ProfileDataResponseType) => void;
};

export const ProfileCard: React.FC<ProfilePropType> = ({
  profile,
  setShowDeleteModal,
  setShowEditModal,
  setProfileData,
}) => {
  const [cardButtons, setCardButtons] = useState(false);
  const formattedDate = getFormattedDate(profile.birthDate);

  return (
    <div
      className={style.profileCardContainer}
      onMouseEnter={() => setCardButtons(true)}
      onMouseLeave={() => setCardButtons(false)}
    >
      {cardButtons && (
        <div className={style.cardButtons}>
          <button
            className={style.editButton}
            onClick={() => {
              setProfileData(profile);
              setShowEditModal(true);
            }}
          >
            Edit
          </button>
          <button
            className={style.deleteButton}
            onClick={() => {
              setProfileData(profile);
              setShowDeleteModal(true);
            }}
          >
            Delete
          </button>
        </div>
      )}

      <div className={style.cardHeader}>
        <img
          src={
            process.env.REACT_APP_STATIC_IMAGES_URL && profile.photo
              ? process.env.REACT_APP_STATIC_IMAGES_URL + profile.photo
              : profile.gender === 'male'
              ? avatarProfileUser
              : avatarProfileUserWM
          }
          alt='avatar'
        />
        <p>{profile.name}</p>
      </div>

      <div className={style.profileData}>
        <p>
          <span className={style.infoLabel}>gender:</span>
          <span className={style.profileInfo}>{profile.gender}</span>
        </p>
        <p>
          <span className={style.infoLabel}>birthdate:</span>
          <span className={style.profileInfo}>{formattedDate}</span>
        </p>
        <p>
          <span className={style.infoLabel}>location:</span>
          <span className={style.profileInfo}>{profile.location.city}</span>
        </p>
        <p>
          <span className={style.infoLabel}>phone:</span>
          <span className={style.profileInfo}>{profile.phone}</span>
        </p>
      </div>
    </div>
  );
};
