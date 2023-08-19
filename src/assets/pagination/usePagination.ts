import { useState } from 'react';

import { InitialState } from 'redux/signed-user-reducer';
import { ProfileDataResponseType } from 'types/profileTypes';

type UserData = Omit<InitialState, 'id'> & { _id?: string } & { profileCount?: number | null };
type PaginationType = UserData[] | ProfileDataResponseType[];

const usePagination = (usersArray: PaginationType | any) => {
  const [currentPage, setСurrentPage] = useState(1);
  const showItems = 12;
  const tatalPages = Math.ceil(usersArray.length / showItems);
  const lastContentIndex = currentPage * showItems;
  const firstContentIndex = lastContentIndex - showItems;
  let paginatedArray = [];

  const changePage = (direction: boolean) => {
    setСurrentPage((state) => {
      if (direction) {
        if (state === tatalPages) {
          return state;
        }
        return state + 1;
      } else {
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };

  for (let i = firstContentIndex; i < lastContentIndex; i++) {
    usersArray[i] && paginatedArray.push(usersArray[i]);
  }

  if (!paginatedArray.length && currentPage !== 1) setСurrentPage(1);

  return {
    paginatedArray,
    currentPage,
    totalPages: tatalPages,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    resetPages: () => setСurrentPage(1),
  };
};

export default usePagination;
