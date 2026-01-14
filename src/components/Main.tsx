import styled from 'styled-components/native';
import useAdaptiveNavigation from '../hooks/use-adaptive-navigation';
import { handleNotificationPermission } from '../fcm/notificationPermission';
import Toast from 'react-native-toast-message';
import { getToastConfig } from '../helpers/fcm.helpers';
import { navigationRef } from '../RootNavigation';
import useMetrics from '../hooks/use-metrics';
import usePlayerStore from '../store/usePlayerStore';
import { useModalStore } from '../store/useModalStore';
import { DEFAULT_MODAL_DATA, UserRole } from '../constants/general';
import { useEffect } from 'react';
import KaotikaUser from '../interfaces/KaotikaUser';
import { Artifact } from '../interfaces/Artifact';
import { useIsLoadingStore } from '../store/useIsLoadingStore';
import useArtifactStore from '../store/useArtifactStore';
import { ModalImage } from '../interfaces/Modal';
import { ModalImgSrc } from '../constants/image-sources';
import { useDiseaseStore } from '../store/useDiseaseStore';
import { Disease } from '../interfaces/disease-store';
import { axiosInstance } from '../helpers/axios.helper';

const Container = styled.View`
  height: 100%;
`;

const Main = () => {
  const setIsLoading = useIsLoadingStore(state => state.setIsLoading);

  const setAcolytes = usePlayerStore(state => state.setAcolytes);

  const setNonAcolytes = usePlayerStore(state => state.setNonAcolytes);

  const setArtifacts = useArtifactStore(state => state.setArtifacts);

  const diseases = useDiseaseStore(state => state.diseases);
  const setDiseases = useDiseaseStore(state => state.setDiseases);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      // Make calls to the API to get acolytes, non-acolytes, artifacts & diseases & save them locally

      const acolytesArray = (await getXArray(
        '/players/acolytes/',
      )) as KaotikaUser[];
      setAcolytes(acolytesArray);

      const nonAcolyteArray = (await getXArray(
        '/players/non-acolytes/',
      )) as KaotikaUser[];
      setNonAcolytes(nonAcolyteArray);

      const artifactsArray = (await getXArray(
        '/missions/artifacts/',
      )) as Artifact[];
      setArtifacts(artifactsArray);

      const diseasesArray = (await getXArray(
        '/missions/diseases/',
      )) as Disease[];
      setDiseases(diseasesArray);

      setIsLoading(false);
    })();
  }, []);

  async function getXArray(
    url: string,
  ): Promise<KaotikaUser[] | Artifact[] | Disease[]> {
    let xArray: any = [];

    await axiosInstance.get(url).then(response => {
      xArray = response.data;
    });

    return xArray;
  }

  const user = usePlayerStore(state => state.user)!;

  const setModalData = useModalStore(state => state.setModalData);

  handleNotificationPermission(user.email).then(permissionDeniedMessage => {
    if (permissionDeniedMessage) {
      setModalData({
        ...DEFAULT_MODAL_DATA,
        content: {
          message: permissionDeniedMessage,
        },
      });
    }
  });

  // Display the corresponding modal (tiredness/disease(s)/curse) to non-betrayer acolytes when conditions are met
  useEffect(() => {
    if (!user.isBetrayer && user.rol === UserRole.ACOLYTE) {
      let message = '';
      const image: ModalImage = { width: ms(250), height: ms(375) };

      const userDiseases = user.diseases!;

      if (user.attributes.resistance! <= 30) {
        message =
          'Feeling a bit tired? That is what happens when you are loyal to Kaotika.';

        image.source = ModalImgSrc.TIRED_ACOLYTE;
      } else if (userDiseases.length > 0) {
        message =
          'You are sick, bad luck. That means one or more of your attributes have been reduced:';

        userDiseases.forEach(userDisease => {
          diseases.forEach(disease => {
            if (userDisease === disease._id) {
              message += `\n-> ${disease.penalty}`;
            }
          });
        });

        image.source = ModalImgSrc.ILL_ACOLYTE;
      } else if (user.isCursed) {
        message =
          'The Ethazium curse corrupts your entire being. It must have been Istvan up to his old tricks...';

        image.source = ModalImgSrc.CURSED_ACOLYTE;
      }

      const modalData = message
        ? { fullScreen: true, content: { message, image } }
        : null;

      setModalData(modalData);
    }
  }, [user, diseases]);

  const Navigation = useAdaptiveNavigation();

  const { ms } = useMetrics();
  const toastConfig = getToastConfig(ms);

  return (
    <Container>
      <Navigation ref={navigationRef} />
      <Toast config={toastConfig} />
    </Container>
  );
};

export default Main;
