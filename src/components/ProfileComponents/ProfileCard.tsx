import Avatar from './Avatar';
import { userData } from './userData';
import './ProfileCard.css';

function ProfileCard() {
  return (
    <div className="profile-card">
      {/* Аватарка */}
      <Avatar name={userData.name} avatarImage={userData.avatar} />
      
      {/* Имя */}
      <h1 className="profile-name">{userData.name}</h1>
      
      {/* Статус эко-энтузиаста с датой */}
      <p className="profile-status">
        Эко-энтузиаст с {userData.registeredDate}
      </p>
      
      {/* Статистика (заглушка) */}
      <div className="profile-stats">
        <div className="stat">
          <div className="stat-value">24</div>
          <div className="stat-label">Дней подряд</div>
        </div>
        <div className="stat">
          <div className="stat-value">87</div>
          <div className="stat-label">Всего дней</div>
        </div>
      </div>
      
      {/* Уровень (заглушка) */}
      <div className="profile-level">
        <h2 className="stat-value">Эко-герой</h2>
        <p className="stat-label">Уровень</p>
      </div>
    </div>
  );
}

export default ProfileCard;