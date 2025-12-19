import { Modal as NativeModal } from 'react-native';
import { ModalData } from '../interfaces/Modal';
import Text from './Text';
import styled from 'styled-components/native';
import type { HS, MS, VS } from '../interfaces/Metrics';
import useMetrics from '../hooks/use-metrics';
import { ModalBackgroundImgSrc } from '../constants/image-sources';
import { getToastConfig } from '../helpers/fcm.helpers';
import Toast from 'react-native-toast-message';

const Container = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const BackgroundImage = styled.ImageBackground<{
  $fullScreen: boolean | undefined;
  $ms: MS;
}>`
  width: ${({ $fullScreen, $ms }) =>
    $fullScreen ? '100%' : $ms(325, 0.65) + 'px'};
  height: ${({ $fullScreen, $ms }) =>
    $fullScreen ? '100%' : $ms(436, 0.65) + 'px'};
`;

const Content = styled.View<{ $fullScreen: boolean | undefined; $vs: VS }>`
  height: 100%;
  justify-content: center;
  align-items: center;
  row-gap: ${({ $vs }) => $vs(18.5)}px;
  padding-block-start: ${({ $fullScreen, $vs }) =>
    $fullScreen ? 0 : $vs(82.5)}px;
`;

const Message = styled(Text)<{ $hs: HS }>`
  padding-inline: ${({ $hs }) => $hs(55)}px;
  text-shadow: 0 0 2.5px rgb(0 0 0);
`;

const Image = styled.Image<{ $width: number; $height: number }>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  filter: drop-shadow(0 0 5px rgb(0 0 0));
`;

const ActionButton = styled.Pressable`
  border-radius: 10px;
  padding: 10px 30px;
  filter: drop-shadow(0 0 5px rgb(0 0 0));
  background-color: rgb(0 0 0 / 0.75);
`;

const ActionButtonText = styled(Message)`
  padding: 0;
  color: rgb(177 164 144);
`;

const ButtonsContainer = styled.View<{ $fullScreen: boolean }>`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${({ $fullScreen }) => ($fullScreen ? '100%' : '70%')};
  gap: 5px;
`;

const Modal = ({
  fullScreen,
  content,
  onPressActionButtonOne,
  actionButtonTextOne,
  onPressActionButtonTwo,
  secondaryButtonTextTwo,
}: ModalData) => {
  const { hs, vs, ms } = useMetrics();

  const toastConfig = getToastConfig(ms);

  return (
    <NativeModal
      animationType="fade"
      backdropColor="rgba(0 0 0 / 0.5)"
      visible={!!content}
    >
      <Container>
        <BackgroundImage
          source={
            fullScreen
              ? ModalBackgroundImgSrc.FULL_SCREEN
              : ModalBackgroundImgSrc.NORMAL
          }
          imageStyle={{
            resizeMode: fullScreen ? 'cover' : 'contain',
          }}
          $fullScreen={fullScreen}
          $ms={ms}
        >
          <Content $fullScreen={fullScreen} $vs={vs}>
            {content?.message && <Message $hs={hs}>{content.message}</Message>}

            {content?.image && (
              <Image
                source={content.image.source}
                $width={content.image.width}
                $height={content.image.height}
              />
            )}

            {actionButtonTextOne && (
              <ButtonsContainer $fullScreen={!!fullScreen}>
                <ActionButton onPress={onPressActionButtonOne}>
                  <ActionButtonText $hs={hs}>
                    {actionButtonTextOne}
                  </ActionButtonText>
                </ActionButton>

                {secondaryButtonTextTwo && (
                  <ActionButton onPress={onPressActionButtonTwo}>
                    <ActionButtonText $hs={hs}>
                      {secondaryButtonTextTwo}
                    </ActionButtonText>
                  </ActionButton>
                )}
              </ButtonsContainer>
            )}
          </Content>
        </BackgroundImage>
      </Container>

      <Toast config={toastConfig} />
    </NativeModal>
  );
};

export default Modal;
