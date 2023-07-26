import style from 'components/common/Preloader/Preloader.module.scss';

const Preloader: React.FC = () => {
  return (
    <div className={style.preloaderContainer}>
      <div className={style.textContainer}>
        <h1>Loading</h1>
        <div className={style.dot1}></div>
        <div className={style.dot2}></div>
        <div className={style.dot3}></div>
      </div>
    </div>
  );
};

export default Preloader;
