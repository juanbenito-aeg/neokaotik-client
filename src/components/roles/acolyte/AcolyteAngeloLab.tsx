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

const AcolyteAngeloLab = ({ route }: any) => {
  const navigation = useNavigation();
  const { tabBarStyle } = route.params;
  const { user, setUser } = useContext(UserContext)!;
  const isInside = user!.isInside;
  const [showQR, setShowQR] = useState<boolean>(false);

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

          {showQR && QRToScan(user!.email, user!.isInside)}
        </>
      ) : (
        <>{QRToScan(user!.email, user!.isInside)}</>
      )}
    </ScreenContainer>
  );
};

export default AcolyteAngeloLab;
