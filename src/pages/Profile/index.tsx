import './index.css';
import HeaderProfile from '../../components/ProfileComponents/HeaderProfile';
import ProfileCard from '../../components/ProfileComponents/ProfileCard';
import ActionButtons from '../../components/ProfileComponents/ActionButtons';
import EcoGoals from '../../components/ProfileComponents/EcoGoals';
import Settings from '../../components/ProfileComponents/Settings';
import ReportPreview from '../../components/ProfileComponents/ReportPreview';

function ProfilePage() {
  return (
    <div className="app">
      {/* HeaderProfile - по центру сверху */}
      <HeaderProfile />

      {/* ДВЕ КОЛОНКИ ПОД НИМ */}
      <div className="two-columns">
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="left-column">
          <ProfileCard />
          <ActionButtons />
          {/* сюда будут добавляться будущие элементы */}
        </div>

        {/* ПРАВАЯ КОЛОНКА */}
        <div className="right-column">
          <EcoGoals />
          <Settings/>
          <ReportPreview/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;