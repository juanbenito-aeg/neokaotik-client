import React, { useState, useEffect, useContext } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../ScreenContainer';
import { UserContext } from '../../../contexts/UserContext';
import {
  ButtonBackgroundImgSrc,
  ScreenBackgroundImgSrc,
  UserRole,
} from '../../../constants';
import Button from '../../Button';
import { listenForAcolyteInsideOutsideLab } from '../../../socket/events/angelo-lab';
import styled from 'styled-components/native';
import useMetrics from '../../../hooks/use-metrics';

const Scannerontainer = styled.View`
  height: 100%;
  align-items: left;
  margin-left: 10%;
  justify-content: center;
`;

const AcolyteAngeloLab = ({ route }: any) => {
  const navigation = useNavigation();
  const { tabBarStyle } = route.params;
  const { user, setUser } = useContext(UserContext)!;
  const isInside = user!.isInside;
  const [showQR, setShowQR] = useState<boolean>(false);
  const { ms } = useMetrics();

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: isInside ? { display: 'none' } : tabBarStyle,
    });
  }, [navigation, isInside]);

  useEffect(() => {
    const userData = listenForAcolyteInsideOutsideLab(
      UserRole.ACOLYTE,
      undefined,
      undefined,
      undefined,
      user!,
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
    <ScreenContainer
      backgroundImgSrc={ScreenBackgroundImgSrc.ACOLYTE_ANGELO_LAB}
    >
      {isInside ? (
        <>
          <Button
            onPress={() => setShowQR(!showQR)}
            backgroundImgSrc={ButtonBackgroundImgSrc.ACOLYTE_THEMED}
            text={showQR ? 'Hide QR' : 'Show QR'}
          />

          {showQR && QRToScan(user!.email, user!.isInside)}
        </>
      ) : (
        <Scannerontainer>
          <>{QRToScan(user!.email, user!.isInside)}</>
        </Scannerontainer>
      )}
    </ScreenContainer>
  );
};

export default AcolyteAngeloLab;
