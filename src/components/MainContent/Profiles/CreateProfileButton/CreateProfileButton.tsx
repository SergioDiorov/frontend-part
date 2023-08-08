import style from 'components/MainContent/Profiles/CreateProfileButton/CreateProfileButton.module.scss';
import userIcon from 'img/icons/userIcon.svg';

export const CreateProfileButton: React.FC = () => {
  return (
    <button className={style.createProfileButton}>
      <img src={userIcon} alt='User icon' />
      <span>Create new profile</span>
    </button>
  );
};
