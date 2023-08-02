import style from 'components/MainContent/CurrentUser/CurrentUserCard/CurrentUserCard.module.scss';
import userDafaultImage from 'img/assets/avatarProfileUser.png';
import { UserType } from 'types/types';

export const CurrentUserCard: React.FC<UserType> = ({
  userName,
  email,
  isAdmin,
}) => {
  return (
    <div className={style.userCardContainer}>
      <img src={userDafaultImage} alt='User imge' />
      <p className={style.userName}>{userName}</p>
      <p className={style.email}>{email}</p>
      <p className={style.role}>{isAdmin ? 'admin' : 'user'}</p>
      <button className={style.editButton}>Edit</button>
      <button className={style.deleteButton}>Delete</button>
    </div>
  );
};
