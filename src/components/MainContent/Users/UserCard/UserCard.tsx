import style from 'components/MainContent/Users/UserCard/UserCard.module.scss';
import { UserDataResponseType } from 'types/apiTypes';
import userDafaultImage from 'img/assets/avatarProfileUser.png';

type CardPropsType = Omit<UserDataResponseType, '_id'> & { id: string };

export const UserCard: React.FC<CardPropsType> = ({
  email,
  userName,
  profileCount,
}) => {
  return (
    <div className={style.cardContainer}>
      <img src={userDafaultImage} alt='User imge' />
      <p className={style.userName}>{userName}</p>
      <p className={style.email}>{email}</p>
      <p className={style.profiles}>
        {profileCount} {profileCount === 1 ? 'profile' : 'profiles'}
      </p>
    </div>
  );
};
