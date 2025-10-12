import ScreenContainer from '../../ScreenContainer';
import {
  ButtonBackgroundImgSrc,
  ScreenBackgroundImgSrc,
  SocketClientToServerEvents,
} from '../../../constants';
import {
  useCameraPermission,
  Camera,
  useCameraDevice,
  useCodeScanner,
  Code,
} from 'react-native-vision-camera';
import { Pressable, StyleSheet } from 'react-native';
import Text from '../../Text';
import { useContext, useState } from 'react';
import { ModalContext } from '../../../contexts/ModalContext';
import { useNavigation } from '@react-navigation/native';
import Button from '../../Button';
import useMetrics from '../../../hooks/use-metrics';
import { socket } from '../../../socket/socket';

const ScanQr = ({ route }) => {
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);

  const setGeneralModalMessage = useContext(ModalContext);

  // Elements needed to display the camera
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned,
  });

  const navigation = useNavigation();
  const { tabBarStyle } = route.params;

  // Styling for the button used to close the camera
  const { moderateScale } = useMetrics();
  const buttonFixedSize: number = 60;
  const scaleFactor: number = 0.2;
  const buttonCustomStyleObj = {
    width: moderateScale(buttonFixedSize, scaleFactor),
    height: moderateScale(buttonFixedSize, scaleFactor),
    position: 'absolute',
    bottom: '5%',
    borderRadius: '50%',
    overflow: 'hidden',
    outlineColor: '#ffffff',
    outlineWidth: moderateScale(3.5, scaleFactor - 0.1),
  };

  async function handlePress() {
    if (hasPermission) {
      toggleCameraAndNavigatorStates();
    } else {
      const userGavePermission: boolean = await requestPermission();

      if (!userGavePermission) {
        setGeneralModalMessage(
          'Istvan, you have to give permission to be able to scan QR codes.',
        );
      } else {
        toggleCameraAndNavigatorStates();
      }
    }
  }

  function toggleCameraAndNavigatorStates() {
    const updatedIsCameraOpen = !isCameraOpen;

    setIsCameraOpen(updatedIsCameraOpen);

    navigation.setOptions({
      tabBarStyle: updatedIsCameraOpen ? { display: 'none' } : tabBarStyle,
    });
  }

  function onCodeScanned(codes: Code[]) {
    // Prevent the client from emitting the "access to/exit from lab" event more than once
    if (codes.length === 1) {
      // Get & log the scanned code's value
      const codeValue: string = codes[0].value!;
      console.log(`The scanned code's value is "${codeValue}".`);

      const acolyteEmailAndIsInside: string[] = codeValue?.split('&');

      const emailValueStartIndex: number = 6;
      const acolyteEmail: string =
        acolyteEmailAndIsInside[0].substring(emailValueStartIndex);

      const isInsideValueStartIndex: number = 9;
      const isInside: boolean =
        acolyteEmailAndIsInside[1].substring(isInsideValueStartIndex) ===
        'true';

      socket.emit(
        SocketClientToServerEvents.ACCESS_TO_EXIT_FROM_LAB,
        acolyteEmail,
        isInside,
      );

      toggleCameraAndNavigatorStates();
    }
  }

  return isCameraOpen ? (
    <>
      <Camera
        device={device}
        isActive={true}
        style={StyleSheet.absoluteFill}
        codeScanner={codeScanner}
      />

      <Button
        customStyleObj={buttonCustomStyleObj}
        onPress={toggleCameraAndNavigatorStates}
        backgroundImgSrc={ButtonBackgroundImgSrc.CLOSE_CAMERA}
        text=""
      />
    </>
  ) : (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.SCAN_QR}>
      <Pressable onPress={handlePress}>
        <Text>Open camera to scan QR</Text>
      </Pressable>
    </ScreenContainer>
  );
};

export default ScanQr;
