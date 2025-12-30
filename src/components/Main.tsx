import styled from 'styled-components/native';
import useAdaptiveNavigation from '../hooks/use-adaptive-navigation';
import { handleNotificationPermission } from '../fcm/notificationPermission';
import Toast from 'react-native-toast-message';
import { getToastConfig } from '../helpers/fcm.helpers';
import { navigationRef } from '../RootNavigation';
import useMetrics from '../hooks/use-metrics';
import usePlayerStore from '../store/usePlayerStore';
import { useModalStore } from '../store/useModalStore';
import { DEFAULT_MODAL_DATA } from '../constants/general';
import { useEffect } from 'react';
import KaotikaUser from '../interfaces/KaotikaUser';
import { Artifact } from '../interfaces/Artifact';
import { useIsLoadingStore } from '../store/useIsLoadingStore';
import useArtifactStore from '../store/useArtifactStore';
import { ModalImage } from '../interfaces/Modal';
import { ModalImgSrc } from '../constants/image-sources';
import { useDiseaseStore } from '../store/useDiseaseStore';
import { Disease } from '../interfaces/disease-store';

const Container = styled.View`
  height: 100%;
`;

const Main = () => {
  const setIsLoading = useIsLoadingStore(state => state.setIsLoading);

  const setAcolytes = usePlayerStore(state => state.setAcolytes);

  const setNonAcolytes = usePlayerStore(state => state.setNonAcolytes);

  const setArtifacts = useArtifactStore(state => state.setArtifacts);

  const setDiseases = useDiseaseStore(state => state.setDiseases);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      // Make calls to the API to get acolytes, non-acolytes, artifacts & diseases & save them locally

      const acolytesArray = (await getXArray(
        'https://neokaotik-server.onrender.com/players/acolytes/',
      )) as KaotikaUser[];
      setAcolytes(acolytesArray);

      const nonAcolyteArray = (await getXArray(
        'https://neokaotik-server.onrender.com/players/non-acolytes/',
      )) as KaotikaUser[];
      setNonAcolytes(nonAcolyteArray);

      const artifactsArray = (await getXArray(
        'https://neokaotik-server.onrender.com/missions/artifacts/',
      )) as Artifact[];
      setArtifacts(artifactsArray);

      const diseasesArray = (await getXArray(
        'https://neokaotik-server.onrender.com/missions/diseases/',
      )) as Disease[];
      setDiseases(diseasesArray);

      setIsLoading(false);
    })();
  }, []);

  async function getXArray(
    url: string,
  ): Promise<KaotikaUser[] | Artifact[] | Disease[]> {
    const response = await fetch(url);

    let xArray = [];

    if (response.ok) {
      xArray = await response.json();
    }

    return xArray;
  }

  const user = usePlayerStore(state => state.user);

  const setModalData = useModalStore(state => state.setModalData);

  handleNotificationPermission(user!.email).then(permissionDeniedMessage => {
    if (permissionDeniedMessage) {
      setModalData({
        ...DEFAULT_MODAL_DATA,
        content: {
          message: permissionDeniedMessage,
        },
      });
    }
  });

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
