import HeaderProfile from "../../features/profileComponents/HeaderProfile";
import ProfileCard from "../../features/profileComponents/ProfileCard";
import ActionButtons from "../../features/profileComponents/ActionButtons";
import EcoGoals from "../../features/profileComponents/EcoGoals";
import Settings from "../../features/profileComponents/Settings";
import ReportPreview from "../../features/profileComponents/ReportPreview";
import ExitButton from "../../features/auth/ExitButton";
import * as S from "./ProfilePage.styles";

function ProfilePage() {
  return (
    <S.PageContainer>
      <HeaderProfile />
      <S.TwoColumns>
        <S.LeftColumn>
          <ProfileCard />
          <ActionButtons />
        </S.LeftColumn>

        <S.RightColumn>
          <EcoGoals />
          <Settings />
          <ReportPreview />
          <ExitButton />
        </S.RightColumn>
      </S.TwoColumns>
    </S.PageContainer>
  );
}

export default ProfilePage;
