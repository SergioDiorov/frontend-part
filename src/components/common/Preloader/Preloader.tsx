import style from 'components/common/Preloader/Preloader.module.scss';

export const Preloader: React.FC = () => {
  return (
    <div className={style.preloaderContainer}>
      <div className={style.textContainer}>
        <h1>Loading</h1>
        <div className={style.firstDot}></div>
        <div className={style.secondDot}></div>
        <div className={style.thirdDot}></div>
      </div>
    </div>
  );
};
