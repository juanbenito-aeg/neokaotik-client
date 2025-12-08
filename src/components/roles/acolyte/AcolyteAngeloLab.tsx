import React, { useState, useEffect } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../ScreenContainer';
import {
  ScreenBackgroundImgSrc,
  ButtonBackgroundImgSrc,
} from '../../../constants/image-sources';
import Button from '../../Button';
import styled from 'styled-components/native';
import useMetrics from '../../../hooks/use-metrics';
import GoBackButton from '../../GoBackButton';
import { NestedScreenProps } from '../../../interfaces/generics';
import Header from '../../Header';
import usePlayerStore from '../../../store/usePlayerStore';
import { useMapStore } from '../../../store/useMapStore';

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

  const isInside = user!.isInside;

  const screenData = {
    backgroundImgSrc: isInside
      ? ScreenBackgroundImgSrc.ACOLYTE_ANGELO_LAB
      : ScreenBackgroundImgSrc.ACOLYTE_ANGELO_LAB_ENTRANCE,
    headerText: `Angelo's Laboratory (${isInside ? 'Interior' : 'Entrance'})`,
  };

  const navigation = useNavigation();
  const tabBarStyle = useMapStore(state => state.tabBarStyle);
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: isInside ? { display: 'none' } : tabBarStyle,
    });
  }, [navigation, isInside]);

  const [showQR, setShowQR] = useState<boolean>(false);

  const { ms } = useMetrics();

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

          <QRWrapper testID="inner-qr-code-container">
            {showQR && QRToScan(user!.email, user!.isInside)}
          </QRWrapper>
        </>
      ) : (
        <>
          <ScannerContainer testID="outer-qr-code-container">
            <>{QRToScan(user!.email, user!.isInside)}</>
          </ScannerContainer>

          <GoBackButton onPress={onPressGoBackButton} />
        </>
      )}
    </ScreenContainer>
  );
};

export default AcolyteAngeloLab;
