import { useState } from 'react';

import { InitialState } from 'redux/signed-user-reducer';

type PaginationType = Array<Omit<InitialState, 'id'> & { _id?: string }>;

const usePagination = (usersArray: PaginationType) => {
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

  return {
    paginatedArray,
    currentPage,
    totalPages: tatalPages,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
  };
};

export default usePagination;
