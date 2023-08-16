import { useState } from 'react';
import { useDispatch } from 'react-redux';

import style from 'components/MainContent/Profiles/ProfileSearch/ProfileSearch.module.scss';
import { AppDispatch } from 'redux/store';
import { getProfilesByName } from 'redux/profile-reducer';
import search from 'img/icons/search.svg';

type ProfileSearchPropsType = {
  userId: string;
};

export const ProfileSearch: React.FC<ProfileSearchPropsType> = ({ userId }) => {
  const [searchList, setSearchList] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (userId: string, name: string) => {
    return dispatch(getProfilesByName({ userId, name: searchList }));
  };

  return (
    <div className={style.searchInputContainer}>
      <button
        className={style.searchButton}
        onClick={() => handleSearch(userId, searchList)}
      >
        <img src={search} alt='searchIcon' />
      </button>
      <input
        className={style.searchInput}
        type='text'
        name='searchInput'
        id='searchInput'
        placeholder='Search name'
        value={searchList}
        onChange={(e) => setSearchList(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch(userId, searchList);
          }
        }}
        onBlur={() => handleSearch(userId, searchList)}
      />
    </div>
  );
};
