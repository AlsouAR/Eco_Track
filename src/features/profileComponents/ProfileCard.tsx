import Avatar from "./Avatar";
import * as S from "./ProfileCard.styles";
import { userData } from "./userData";
import { useAppSelector } from "../../store/hooks";
import {
  selectHighestAchievement,
  selectStreakData,
  selectTotalActiveDays,
} from "../habits/store/selectors";

function ProfileCard() {
  const { currentStreak } = useAppSelector(selectStreakData);
  const totalDays = useAppSelector(selectTotalActiveDays);
  const highestAchievement = useAppSelector(selectHighestAchievement);

  return (
    <S.ProfileCardWrapper>
      <Avatar name={userData.name} avatarImage={userData.avatar} />

      <S.ProfileName>{userData.name}</S.ProfileName>

      <S.ProfileStatus>Эко-энтузиаст с {userData.registeredDate}</S.ProfileStatus>

      <S.ProfileStats>
        <S.StatItem>
          <S.StatValue>{currentStreak}</S.StatValue>
          <S.StatLabel>Дней подряд</S.StatLabel>
        </S.StatItem>
        <S.StatItem>
          <S.StatValue>{totalDays}</S.StatValue>
          <S.StatLabel>Всего дней</S.StatLabel>
        </S.StatItem>
      </S.ProfileStats>

      <S.ProfileLevel>
        <S.LevelTitle>{highestAchievement.title}</S.LevelTitle>
        <S.StatLabel>Уровень</S.StatLabel>
      </S.ProfileLevel>
    </S.ProfileCardWrapper>
  );
}

export default ProfileCard;
