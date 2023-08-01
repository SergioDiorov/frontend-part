import style from 'components/common/Pagination/Pagination.module.scss';
import iconLeft from 'img/icons/iconLeft.svg';
import iconRight from 'img/icons/iconRight.svg';

type PaginationPropsType = {
  prevPage: () => void;
  nextPage: () => void;
  currentPage: number;
  totalPages: number;
};

const Pagination: React.FC<PaginationPropsType> = ({
  prevPage,
  nextPage,
  currentPage,
  totalPages,
}) => {
  return (
    <div className={style.paginationContainer}>
      <button onClick={() => prevPage()}>
        <img src={iconLeft} alt='arrowLeft' />
      </button>
      <div>
        <span>{currentPage}</span>
        <span className={style.paginationDots}>...</span>
        <span className={style.paginatioNumber}>{totalPages}</span>
      </div>

      <button onClick={() => nextPage()}>
        <img src={iconRight} alt='arrowRight' />
      </button>
    </div>
  );
};

export default Pagination;
