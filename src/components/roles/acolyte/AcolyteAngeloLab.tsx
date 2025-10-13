import React, { useState, useEffect, useContext } from 'react';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../ScreenContainer';
import { UserContext } from '../../../contexts/UserContext';
import {
  ButtonBackgroundImgSrc,
  ScreenBackgroundImgSrc,
} from '../../../constants';
import Button from '../../Button';

const AcolyteAngeloLab = () => {
  const { user }: any = useContext(UserContext);
  const navigation = useNavigation();
  const [showQR, setShowQR] = useState<boolean>(false);
  const isInside = false;

  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: isInside
        ? { display: 'none' }
        : {
            backgroundColor: '#0a171e',
            borderColor: '#333',
          },
    });
  }, [navigation, isInside]);

  const QRToScan = (email: string) => (
    <QRCode
      value={email}
      size={250}
      color="rgba(87, 175, 216)"
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

          {showQR && QRToScan(user.email)}
        </>
      ) : (
        <>{QRToScan(user.email)}</>
      )}
    </ScreenContainer>
  );
};

export default AcolyteAngeloLab;
