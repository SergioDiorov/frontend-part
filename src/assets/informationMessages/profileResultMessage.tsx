import { useDispatch } from 'react-redux';
import { AppDispatch } from 'redux/store';

import style from 'assets/informationMessages/profileResultMessage.module.scss';
import { resetOutcome } from 'redux/profile-reducer';

type ProfileResultMessagePropsType = { error: boolean };

export const ProfileResultMessage: React.FC<ProfileResultMessagePropsType> = ({
  error,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  setTimeout(() => dispatch(resetOutcome()), 3500);

  return (
    <div
      className={style.messageContainer}
      style={{
        background: error ? '#af253c' : '#8fcb9b',
      }}
    >
      <span>
        {error
          ? 'Error occured profile didnt save'
          : 'Profile successfuly saved'}
      </span>
    </div>
  );
};
