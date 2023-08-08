import style from 'components/MainContent/CurrentUser/CurrentUserCard/CurrentUserCard.module.scss';
import userDafaultImage from 'img/assets/avatarProfileUser.png';
import { UserType } from 'types/types';

type CurrentUserCardType = Partial<UserType> & {
  setEditUserMode: (param: boolean) => void;
  setDeleteUserMode: (param: boolean) => void;
};

export const CurrentUserCard: React.FC<CurrentUserCardType> = ({
  setEditUserMode,
  setDeleteUserMode,
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
      <button
        className={style.editButton}
        onClick={() => setEditUserMode(true)}
      >
        Edit
      </button>
      <button
        className={style.deleteButton}
        onClick={() => {
          setDeleteUserMode(true);
        }}
      >
        Delete
      </button>
    </div>
  );
};
