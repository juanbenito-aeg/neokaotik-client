import styled from 'styled-components/native';
import { UserRole } from '../../constants/general';
import { ScreenBackgroundImgSrc } from '../../constants/image-sources';
import usePlayerStore from '../../store/usePlayerStore';
import ScreenContainer from '../ScreenContainer';
import useMetrics from '../../hooks/use-metrics';
import { MS } from '../../interfaces/Metrics';
import { AcolyteState } from './AcolyteState';
import { useState } from 'react';
import KaotikaUser from '../../interfaces/KaotikaUser';
import { Actions } from './Actions';

const AcolytesActionsContainer = styled.View<{ $ms: MS }>`
  width: 100%;
  height: 100%;
  padding: ${({ $ms }) => $ms(17.5)}px;
  padding-bottom: ${({ $ms }) => $ms(67.5, 0.6)}px;
`;

const AcolytesContainer = styled.View<{ $ms: MS }>`
  height: 50%;
  justify-content: flex-start;
  gap: ${({ $ms }) => $ms(17.5)}px;
`;

const AcolyteContainer = styled.Pressable<{ $isActive: boolean; $ms: MS }>`
  width: 100%;
  height: 45%;
  justify-content: center;
  border: ${({ $isActive }) => ($isActive ? 5 : 2.5)}px solid rgb(191 245 205);
  border-radius: 25px;
  background-color: black;
  filter: ${({ $isActive, $ms }) =>
    $isActive ? `drop-shadow(0 0 ${$ms(7.5)}px rgb(191 245 205))` : 'none'};
`;

const AcolyteRow = styled.View<{ $ms: MS }>`
  height: ${({ $ms }) => $ms(100)}px;
  flex-direction: row;
  align-items: center;
  gap: ${({ $ms }) => $ms(14)}px;
  padding: ${({ $ms }) => $ms(14)}px;
`;

const Avatar = styled.Image<{ $ms: MS }>`
  width: ${({ $ms }) => $ms(75)}px;
  height: ${({ $ms }) => $ms(75)}px;
  border-radius: 9999px;
`;

const AcolyteManager = () => {
  const [activeAcolyte, setActiveAcolyte] = useState<KaotikaUser | null>(null);

  const user = usePlayerStore(state => state.user)!;

  const nonBetrayerAcolytes = usePlayerStore(state => state.acolytes).filter(
    acolyte => !acolyte.isBetrayer,
  );

  const { ms } = useMetrics();

  const screenContainerBackgroundImgSrc =
    user.rol === UserRole.ISTVAN
      ? ScreenBackgroundImgSrc.ISTVAN_HOME /* TODO: Specify the correct image source */
      : user.rol === UserRole.MORTIMER
      ? ScreenBackgroundImgSrc.MORTIMER_HOME /* TODO: Specify the correct image source */
      : ScreenBackgroundImgSrc.VILLAIN_ACOLYTE_MANAGER;

  function handlePress(acolyte: KaotikaUser) {
    const nextActiveAcolyte = acolyte === activeAcolyte ? null : acolyte;

    setActiveAcolyte(nextActiveAcolyte);
  }

  return (
    <ScreenContainer backgroundImgSrc={screenContainerBackgroundImgSrc}>
      <AcolytesActionsContainer $ms={ms}>
        <AcolytesContainer $ms={ms}>
          {nonBetrayerAcolytes.map(nonBetrayerAcolyte => (
            <AcolyteContainer
              key={nonBetrayerAcolyte._id}
              onPress={() => {
                handlePress(nonBetrayerAcolyte);
              }}
              $isActive={nonBetrayerAcolyte === activeAcolyte}
              $ms={ms}
            >
              <AcolyteRow $ms={ms}>
                <Avatar source={{ uri: nonBetrayerAcolyte.avatar }} $ms={ms} />

                <AcolyteState acolyte={nonBetrayerAcolyte} />
              </AcolyteRow>
            </AcolyteContainer>
          ))}
        </AcolytesContainer>

        <Actions activeAcolyte={activeAcolyte} />
      </AcolytesActionsContainer>
    </ScreenContainer>
  );
};

export { AcolyteManager };
