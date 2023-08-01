import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType } from 'redux/store';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';

import { getAllUsersTh } from 'redux/users-page-reducer';
import style from 'components/MainContent/Users/Users.module.scss';
import UserCard from 'components/MainContent/Users/UserCard/UserCard';
import Pagination from 'components/common/Pagination/Pagination';
import usePagination from 'assets/pagination/usePagination';

const Users: React.FC = () => {
  const userId = useSelector((state: StateType) => state.auth.userId);
  const allUsers = useSelector((state: StateType) => state.users.usersData);

  const dispatch = useDispatch<AppDispatch>();
  const { paginatedArray, totalPages, currentPage, nextPage, prevPage } =
    usePagination(allUsers);

  useEffect(() => {
    dispatch(getAllUsersTh());
  }, []);

  return userId ? (
    <div className={style.usersContainer}>
      <h1 className={style.usersTitle}>Users</h1>
      <div className={style.cardContainer}>
        {paginatedArray &&
          paginatedArray.length > 0 &&
          paginatedArray.map((user) => {
            return (
              user._id &&
              user.email &&
              user.isAdmin !== null &&
              user.userName && (
                <Link to={`/users/${user._id}`} state={user} key={user._id}>
                  <UserCard
                    email={user.email}
                    id={user._id}
                    isAdmin={user.isAdmin}
                    userName={user.userName}
                  />
                </Link>
              )
            );
          })}
      </div>
      {paginatedArray && paginatedArray.length > 0 && (
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

export default Users;
