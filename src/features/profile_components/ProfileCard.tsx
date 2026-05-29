import Avatar from './Avatar';
import { userData } from './userData';
import { useAppSelector } from '../../store/hooks';
import { selectStreakData, selectTotalActiveDays } from '../habits/store/selectors';
import './ProfileCard.css';

function ProfileCard() {
  const { currentStreak, bestStreak } = useAppSelector(selectStreakData);
  const totalDays = useAppSelector(selectTotalActiveDays);

  return (
    <div className="profile-card">
      <Avatar name={userData.name} avatarImage={userData.avatar} />
      
      <h1 className="profile-name">{userData.name}</h1>
      
      <p className="profile-status">
        Эко-энтузиаст с {userData.registeredDate}
      </p>
      
      <div className="profile-stats">
        <div className="stat">
          <div className="stat-value">{currentStreak}</div>
          <div className="stat-label">Дней подряд</div>
        </div>
        <div className="stat">
          <div className="stat-value">{totalDays}</div>
          <div className="stat-label">Всего дней</div>
        </div>
      </div>
      
      <div className="profile-level">
        <h2 className="stat-value">Эко-герой</h2>
        <p className="stat-label">Уровень</p>
      </div>
    </div>
  );
}

export default ProfileCard;