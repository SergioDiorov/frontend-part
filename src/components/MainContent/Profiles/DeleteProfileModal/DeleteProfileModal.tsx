import { useDispatch } from 'react-redux';

import style from 'components/MainContent/Profiles/DeleteProfileModal/DeleteProfileModal.module.scss';
import { AppDispatch } from 'redux/store';
import { deleteProfile } from 'redux/profile-reducer';

type DeleteProfileModalPropsType = {
  setDeleteProfileId: (param: null) => void;
  deleteProfileId: string;
};
export const DeleteProfileModal: React.FC<DeleteProfileModalPropsType> = ({
  deleteProfileId,
  setDeleteProfileId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const onDelete = () => {
    setDeleteProfileId(null);
    dispatch(deleteProfile(deleteProfileId));
  };

  return (
    <div
      className={style.deleteUserContainer}
      onClick={(e) => e.target === e.currentTarget && setDeleteProfileId(null)}
    >
      <div className={style.modalContainer}>
        <h2 className={style.deleteUserTitle}>
          Are you sure you want to delete profile?
        </h2>

        <div className={style.deleteButtonContainer}>
          <button className={style.confirmButton} onClick={onDelete}>
            Yes
          </button>
          <button
            className={style.declineButton}
            onClick={() => setDeleteProfileId(null)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
