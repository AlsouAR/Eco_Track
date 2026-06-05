import "./profilePage.css";
import HeaderProfile from "../../features/profile_components/HeaderProfile";
import ProfileCard from "../../features/profile_components/ProfileCard";
import ActionButtons from "../../features/profile_components/ActionButtons";
import EcoGoals from "../../features/profile_components/EcoGoals";
import Settings from "../../features/profile_components/Settings";
import ReportPreview from "../../features/profile_components/ReportPreview";
import ExitButton from "../../features/auth/exit_button";

function ProfilePage() {
  return (
    <div className="app">
      <HeaderProfile />
      <div className="two-columns">
        {/* ЛЕВАЯ КОЛОНКА */}
        <div className="left-column">
          <ProfileCard />
          <ActionButtons />
        </div>

        {/* ПРАВАЯ КОЛОНКА */}
        <div className="right-column">
          <EcoGoals />
          <Settings />
          <ReportPreview />
          <ExitButton />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
