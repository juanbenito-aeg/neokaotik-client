import React, { useState, useEffect, useContext } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../ScreenContainer';
import {
  ButtonBackgroundImgSrc,
  ScreenBackgroundImgSrc,
  UserRole,
} from '../../../constants';
import Button from '../../Button';
import { listenForAcolyteInsideOutsideLab } from '../../../socket/events/angelo-lab';
import styled from 'styled-components/native';
import useMetrics from '../../../hooks/use-metrics';
import { TabBarStyleContext } from '../../../contexts/MapContext';
import GoBackButton from '../../GoBackButton';
import { NestedScreenProps } from '../../../interfaces/generics';
import Header from '../../Header';
import usePlayerStore from '../../../store/usePlayerStore';

const ScannerContainer = styled.View`
  height: 100%;
  align-items: left;
  margin-right: 40%;
  justify-content: center;
`;

const QRWrapper = styled.View`
  margin-top: 24px;
  align-items: center;
`;

const AcolyteAngeloLab = ({ onPressGoBackButton }: NestedScreenProps) => {
  const user = usePlayerStore(state => state.user);
  const setUser = usePlayerStore(state => state.setUser);

  const isInside = user!.isInside;

  const screenData = {
    backgroundImgSrc: isInside
      ? ScreenBackgroundImgSrc.ACOLYTE_ANGELO_LAB
      : ScreenBackgroundImgSrc.ACOLYTE_ANGELO_LAB_ENTRANCE,
    headerText: `Angelo's Laboratory (${isInside ? 'Interior' : 'Entrance'})`,
  };

  const navigation = useNavigation();
  const tabBarStyle = useContext(TabBarStyleContext);
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: isInside ? { display: 'none' } : tabBarStyle,
    });
  }, [navigation, isInside]);

  const [showQR, setShowQR] = useState<boolean>(false);

  const { ms } = useMetrics();

  useEffect(() => {
    const userData = listenForAcolyteInsideOutsideLab(
      UserRole.ACOLYTE,
      undefined,
      undefined,
      undefined,
      setUser,
    );
    return userData;
  }, []);

  const QRToScan = (email: string, isInside: boolean) => (
    <QRCode
      value={`email=${email}&isInside=${isInside}`}
      size={ms(150, 1)}
      color="rgba(191 170 132)"
      backgroundColor="black"
    />
  );

  return (
    <ScreenContainer backgroundImgSrc={screenData.backgroundImgSrc}>
      <Header>{screenData.headerText}</Header>

      {isInside ? (
        <>
          <Button
            onPress={() => setShowQR(!showQR)}
            backgroundImgSrc={ButtonBackgroundImgSrc.DEFAULT_THEMED}
            text={showQR ? 'Hide QR' : 'Show QR'}
          />

          <QRWrapper>
            {showQR && QRToScan(user!.email, user!.isInside)}
          </QRWrapper>
        </>
      ) : (
        <>
          <ScannerContainer>
            <>{QRToScan(user!.email, user!.isInside)}</>
          </ScannerContainer>

          <GoBackButton onPress={onPressGoBackButton} />
        </>
      )}
    </ScreenContainer>
  );
};

export default AcolyteAngeloLab;
