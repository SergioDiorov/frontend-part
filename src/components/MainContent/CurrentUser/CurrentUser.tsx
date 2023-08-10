import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import style from 'components/MainContent/CurrentUser/CurrentUser.module.scss';
import { AppDispatch, StateType } from 'redux/store';
import { CurrentUserCard } from 'components/MainContent/CurrentUser/CurrentUserCard/CurrentUserCard';
import { EditUserModal } from 'components/MainContent/CurrentUser/EditUserModal/EditUserModal';
import { DeleteUserModal } from 'components/MainContent/CurrentUser/DeleteUserModal/DeleteUserModal';
import { CurrentUserProfiles } from 'components/MainContent/CurrentUser/CurrentUserProfiles/CurrentUserProfiles';
import {
  getCurrentUserById,
  getCurrentUserProfiles,
} from 'redux/current-user-reducer';
import { resetProfileAdded } from 'redux/profile-reducer';

export const CurrentUser: React.FC = () => {
  const { state } = useLocation();
  const [editUserMode, setEditUserMode] = useState(false);
  const [deleteUserMode, setDeleteUserMode] = useState(false);
  const [isUserDeleted, setUserDeleted] = useState(false);

  const areProfilesChanged = useSelector(
    (state: StateType) => state.profile.areProfilesChanged
  );
  const loggedUserId = useSelector((state: StateType) => state.auth.userId);
  const userData = useSelector(
    (state: StateType) => state.currentUser.userData
  );
  const dispatch = useDispatch<AppDispatch>();

  if (areProfilesChanged) {
    dispatch(resetProfileAdded());
    dispatch(getCurrentUserProfiles(state._id));
  }

  useEffect(() => {
    dispatch(getCurrentUserById(state._id));
    dispatch(getCurrentUserProfiles(state._id));
  }, []);

  if (!loggedUserId) {
    return <Navigate to='/signin' replace={true} />;
  }
  if (isUserDeleted) {
    return <Navigate to='/users' replace={true} />;
  }

  return (
    <div className={style.currentUserContainer}>
      {editUserMode && (
        <EditUserModal
          setEditUser={setEditUserMode}
          userName={userData?.userName}
          email={userData?.email}
          isAdmin={userData?.isAdmin}
          userId={state._id}
        />
      )}
      {deleteUserMode && (
        <DeleteUserModal
          setUserDeletedMode={setUserDeleted}
          setDeleteUserMode={setDeleteUserMode}
          userId={state._id}
        />
      )}
      <CurrentUserCard
        userName={userData?.userName}
        email={userData?.email}
        isAdmin={userData?.isAdmin}
        setEditUserMode={setEditUserMode}
        setDeleteUserMode={setDeleteUserMode}
      />
      <CurrentUserProfiles userId={state._id} />
    </div>
  );
};
