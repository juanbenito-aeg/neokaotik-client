import { Modal } from 'react-native';
import { GeneralModalProps } from '../interfaces/GeneralModal';
import Text from './Text';
import styled from 'styled-components/native';
import type { HS, MS, VS } from '../interfaces/Metrics';
import useMetrics from '../hooks/use-metrics';

const Container = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const BackgroundImage = styled.ImageBackground<{ $ms: MS }>`
  width: ${({ $ms }) => $ms(325, 0.65)}px;
  height: ${({ $ms }) => $ms(436, 0.65)}px;
`;

const Content = styled.View<{ $vs: VS }>`
  height: 100%;
  justify-content: center;
  align-items: center;
  row-gap: ${({ $vs }) => $vs(18.5)}px;
  padding-block-start: ${({ $vs }) => $vs(82.5)}px;
`;

const Message = styled(Text)<{ $hs: HS }>`
  padding-inline: ${({ $hs }) => $hs(55)}px;
  text-shadow: 0 0 2.5px rgb(0 0 0);
`;

const DismissButton = styled.Pressable`
  border-radius: 10px;
  padding: 10px 30px;
  filter: drop-shadow(0 0 5px rgb(0 0 0));
  background-color: rgb(0 0 0 / 0.65);
`;

const DismissButtonText = styled(Message)`
  padding: 0;
  color: rgb(177 164 144);
`;

const GeneralModal = ({ message, setMessage }: GeneralModalProps) => {
  const { hs, vs, ms } = useMetrics();

  function handlePress(): void {
    setMessage('');
  }

  return (
    <Modal
      animationType="fade"
      backdropColor="rgba(0 0 0 / 0.5)"
      visible={!!message}
    >
      <Container>
        <BackgroundImage
          source={require('../../public/images/general-modal.png')}
          imageStyle={{ resizeMode: 'contain' }}
          $ms={ms}
        >
          <Content $vs={vs}>
            <Message $hs={hs}>{message}</Message>

            <DismissButton onPress={handlePress}>
              <DismissButtonText $hs={hs}>Dismiss</DismissButtonText>
            </DismissButton>
          </Content>
        </BackgroundImage>
      </Container>
    </Modal>
  );
};

export default GeneralModal;
