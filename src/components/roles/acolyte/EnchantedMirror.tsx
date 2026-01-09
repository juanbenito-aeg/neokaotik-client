import React from 'react';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import {
  ButtonBackgroundImgSrc,
  ScreenBackgroundImgSrc,
} from '../../../constants/image-sources';
import usePlayerStore from '../../../store/usePlayerStore';
import ScreenContainer from '../../ScreenContainer';
import useMetrics from '../../../hooks/use-metrics';
import { MS } from '../../../interfaces/Metrics';
import Text from '../../Text';
import { emitAcolyteRested } from '../../../socket/events/acolyte-rested';
import Button from '../../Button';

const Center = styled.View<{ $ms: MS }>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-bottom: ${({ $ms }) => $ms(40, 0.6)}px;
`;

const Avatar = styled(Animatable.Image)<{ $ms: MS }>`
  width: ${({ $ms }) => $ms(120, 0.5)}px;
  height: ${({ $ms }) => $ms(120, 0.5)}px;
  border-radius: 9999px;
  margin-bottom: ${({ $ms }) => $ms(24, 0.5)}px;
`;

const BarWrapper = styled.View<{ $ms: MS }>`
  width: ${({ $ms }) => $ms(220, 0.6)}px;
  margin-bottom: ${({ $ms }) => $ms(28, 0.6)}px;
`;

const BarFrame = styled.View`
  height: 14px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.65);
  border: 1px solid rgba(191, 174, 132, 0.4);
  overflow: hidden;
`;

const BarFill = styled.View`
  height: 100%;
  border-radius: 10px;
`;

const AttributesGrid = styled.View<{ $ms: MS }>`
  width: ${({ $ms }) => $ms(320, 0.8)}px;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 10px;
`;

const AttributeRune = styled(Animatable.View)`
  width: 30%;
  margin: 0 1.5%;
  margin-bottom: 12px;
  padding: 10px 8px;
  align-items: center;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(191, 174, 132, 0.25);
`;

const DynamicText = styled(Text)<{
  $ms: MS;
  $size: number;
  $color: string;
  $weight?: string | number;
  $align?: string;
}>`
  font-size: ${({ $ms, $size }) => $ms($size, 0.6)}px;
  color: ${({ $color }) => $color};
  font-weight: ${({ $weight }) => $weight || 'normal'};
  text-align: ${({ $align }) => $align || 'center'};
  letter-spacing: 1px;
`;

const EnchantedMirror = () => {
  const user = usePlayerStore(state => state.user)!;

  const { ms } = useMetrics();

  const resistance = user.attributes.resistance!;

  const barColor =
    resistance > 60 ? '#3cff9e' : resistance > 30 ? '#ffb84d' : '#ff4d4d';

  const attributes = [
    ['INT', user.attributes.intelligence],
    ['DEX', user.attributes.dexterity],
    ['CHA', user.attributes.charisma],
    ['STR', user.attributes.strength],
    ['CON', user.attributes.constitution],
    ['INS', user.attributes.insanity],
  ];

  const restButtonCustomStyleObj = { width: ms(170, 0.75) };

  function handlePress() {
    emitAcolyteRested(user._id);
  }

  return (
    <ScreenContainer backgroundImgSrc={ScreenBackgroundImgSrc.ENCHANTED_MIRROR}>
      <Center $ms={ms}>
        <Avatar
          source={{ uri: user.avatar }}
          $ms={ms}
          animation="pulse"
          iterationCount="infinite"
          duration={4200}
        />

        <BarWrapper $ms={ms}>
          <BarFrame>
            <BarFill
              style={{
                width: `${resistance}%`,
                backgroundColor: barColor,
              }}
            />
          </BarFrame>

          <DynamicText
            $ms={ms}
            $size={16}
            $color="#ffd25f"
            style={{ marginTop: 6 }}
          >
            RESISTANCE {resistance}%
          </DynamicText>
        </BarWrapper>

        <AttributesGrid $ms={ms}>
          {attributes.map(([label, value], index) => (
            <AttributeRune key={label} animation="fadeInUp" delay={index * 60}>
              <DynamicText $ms={ms} $size={14} $color="#bfae84">
                {label}
              </DynamicText>

              <DynamicText $ms={ms} $size={24} $color="white" $weight="600">
                {value}
              </DynamicText>
            </AttributeRune>
          ))}
        </AttributesGrid>

        {resistance < 100 && (
          <Button
            customStyleObj={restButtonCustomStyleObj}
            onPress={handlePress}
            backgroundImgSrc={ButtonBackgroundImgSrc.DEFAULT_THEMED}
            text="Rest"
          />
        )}
      </Center>
    </ScreenContainer>
  );
};

export default EnchantedMirror;
