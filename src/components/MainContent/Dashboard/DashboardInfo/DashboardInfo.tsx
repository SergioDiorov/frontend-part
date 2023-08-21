import style from 'components/MainContent/Dashboard/DashboardInfo/DashboardInfo.module.scss';
import usersDashboardIcon from 'img/icons/usersDashboard.svg';

type DashboardInfoType = {
  infoTitle: string;
  infoData: number | null;
};

export const DashboardInfo: React.FC<DashboardInfoType> = ({
  infoTitle,
  infoData,
}) => {
  return (
    <div className={style.infoContainer}>
      <p className={style.infoTitle}>
        <img src={usersDashboardIcon} alt='infoIcon' />
        <span>{infoTitle}</span>
      </p>
      <p className={style.infoData}>{'No information' && infoData}</p>
    </div>
  );
};
