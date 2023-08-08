import { useDispatch } from 'react-redux';

import { AppDispatch } from 'redux/store';
import { deleteUser } from 'redux/current-user-reducer';
import style from 'components/MainContent/CurrentUser/DeleteUserModal/DeleteUserModal.module.scss';

type DeleteUserModalPropsType = {
  setUserDeletedMode: (param: boolean) => void;
  setDeleteUserMode: (param: boolean) => void;
  userId: string;
};
export const DeleteUserModal: React.FC<DeleteUserModalPropsType> = ({
  setUserDeletedMode,
  setDeleteUserMode,
  userId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const onDelete = () => {
    dispatch(deleteUser(userId));
    setDeleteUserMode(false);
    setUserDeletedMode(true);
  };

  return (
    <div
      className={style.deleteUserContainer}
      onClick={(e) => e.target === e.currentTarget && setDeleteUserMode(false)}
    >
      <div className={style.modalContainer}>
        <h2 className={style.deleteUserTitle}>
          Are you sure you want to delete profile?
        </h2>

        <div className={style.deleteButtonContainer}>
          <button className={style.confirmButtonContainer} onClick={onDelete}>
            Yes
          </button>
          <button
            className={style.declineButtonContainer}
            onClick={() => setDeleteUserMode(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
