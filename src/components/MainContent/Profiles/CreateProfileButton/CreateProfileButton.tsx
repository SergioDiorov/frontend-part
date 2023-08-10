import style from 'components/MainContent/Profiles/CreateProfileButton/CreateProfileButton.module.scss';
import userIcon from 'img/icons/userIcon.svg';

type CreateProfileButtonPropsType = {
  setCreateProfile: (param: boolean) => void;
};

export const CreateProfileButton: React.FC<CreateProfileButtonPropsType> = ({
  setCreateProfile,
}) => {
  return (
    <button
      className={style.createProfileButton}
      onClick={() => setCreateProfile(true)}
    >
      <img src={userIcon} alt='User icon' />
      <span>Create new profile</span>
    </button>
  );
};
