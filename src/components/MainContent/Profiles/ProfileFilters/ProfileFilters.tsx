import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from 'components/MainContent/Profiles/ProfileFilters/ProfileFilters.module.scss';
import { useDebounce } from 'assets/helpers/useDebounce';
import { AppDispatch, StateType } from 'redux/store';
import {
  emptySearchList,
  getAdultProfiles,
  getCitiesList,
  getCountriesList,
  getProfilesByCity,
  getProfilesByCountry,
  getUserProfile,
} from 'redux/profile-reducer';
import arrowDown from 'img/icons/arrowDown.svg';

type ProfileFiltersPropsType = {
  userId: string;
  resetPages: () => void;
  isNameSearch: boolean;
  setNameSearch: (param: boolean) => void;
};

export const ProfileFilters: React.FC<ProfileFiltersPropsType> = ({
  userId,
  resetPages,
  isNameSearch,
  setNameSearch,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const searchListResponse = useSelector(
    (state: StateType) => state.profile.searchList
  );

  const [isOpen, setIsOpen] = useState(false);
  const [searchList, setSearchList] = useState('');
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);

  const debouncedSearch = useDebounce(searchList, 400);

  const options = [
    { value: 'country', label: 'Country' },
    { value: 'city', label: 'City' },
    { value: 'adultUsers', label: 'Users 18+' },
    { value: 'default', label: 'Default' },
  ];

  const handleSearchLocation = (
    userId: string,
    location: string,
    selectedOption: string
  ) => {
    if (selectedOption === 'country') {
      return dispatch(getProfilesByCountry({ userId, country: location }));
    }
    if (selectedOption === 'city') {
      return dispatch(getProfilesByCity({ userId, city: location }));
    }
  };

  const handleSearchList = (
    userId: string,
    location: string,
    selectedOption: string
  ) => {
    if (selectedOption === 'country') {
      return dispatch(getCountriesList({ userId, country: location }));
    }
    if (selectedOption === 'city') {
      return dispatch(getCitiesList({ userId, city: location }));
    }
  };

  useEffect(() => {
    if (isNameSearch) {
      setSelectedOption({ value: 'default', label: 'Default' });
    }
  }, [isNameSearch]);

  useEffect(() => {
    if (searchListResponse?.includes(searchList)) {
      dispatch(emptySearchList());
    } else {
      if (
        (debouncedSearch || debouncedSearch === '') &&
        selectedOption?.value
      ) {
        handleSearchList(userId, searchList, selectedOption.value);
      }
    }
  }, [debouncedSearch]);

  useEffect(() => {
    setSearchList('');
    resetPages();
    setNameSearch(false);

    if (
      !isNameSearch &&
      (selectedOption?.value === 'city' ||
        selectedOption?.value === 'country' ||
        selectedOption?.value === 'default')
    ) {
      dispatch(getUserProfile(userId));
    }

    if (selectedOption?.value === 'adultUsers') {
      dispatch(getAdultProfiles(userId));
    }
  }, [selectedOption]);

  return (
    <>
      {(selectedOption?.value === 'city' ||
        selectedOption?.value === 'country') && (
        <div className={style.locationContainer}>
          <div className={style.searchInputContainer}>
            <input
              className={
                searchListResponse ? style.closedInput : style.openedInput
              }
              type='text'
              name='searchInput'
              id='searchInput'
              placeholder={`Search ${selectedOption?.value}`}
              value={searchList}
              onChange={(e) => setSearchList(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchLocation(
                    userId,
                    searchList,
                    selectedOption.value
                  );
                }
              }}
            />
            <img
              src={arrowDown}
              alt='arrowDown'
              style={
                searchListResponse
                  ? { transform: 'rotate(180deg)' }
                  : { transform: 'rotate(0deg)' }
              }
            />
          </div>
          {!!searchListResponse?.length && searchListResponse && (
            <ul className={style.dropdownList}>
              {searchListResponse.map((value) => (
                <p
                  key={value}
                  className={style.option}
                  onClick={() => {
                    setSearchList(value);
                    handleSearchLocation(userId, value, selectedOption.value);
                  }}
                >
                  {value}
                </p>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className={style.selectContainer}>
        <div
          className={
            isOpen ? style.selectedOptionClose : style.selectedOptionOpen
          }
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? (
            <p>
              {selectedOption.label} <img src={arrowDown} alt='arrowDown' />
            </p>
          ) : (
            <p>
              Filter <img src={arrowDown} alt='' />
            </p>
          )}
        </div>

        {isOpen && (
          <ul className={style.dropdownList}>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  setSelectedOption(option);
                  setIsOpen(false);
                }}
                className={style.option}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
