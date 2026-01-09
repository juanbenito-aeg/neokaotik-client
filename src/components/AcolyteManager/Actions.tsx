import styled from 'styled-components/native';
import useMetrics from '../../hooks/use-metrics';
import { useDiseaseStore } from '../../store/useDiseaseStore';
import usePlayerStore from '../../store/usePlayerStore';
import { MS } from '../../interfaces/Metrics';
import Text from '../Text';
import Button from '../Button';
import { ButtonBackgroundImgSrc } from '../../constants/image-sources';
import { AidType, MortimerModeState, UserRole } from '../../constants/general';
import { Action, ActionsProps } from '../../interfaces/AcolyteManager';
import { emitAcolyteInfected } from '../../socket/events/acolyte-infected';
import { ViewStyle } from 'react-native';
import { VoidFunction } from '../../interfaces/generics';
import { emitAcolyteCursed } from '../../socket/events/acolyte-cursed';
import emitMortimerAidedAcolyte from '../../socket/events/mortimer-aided-acolyte';
import { useIsLoadingStore } from '../../store/useIsLoadingStore';

const Container = styled.View<{
  $isUserIstvan: boolean;
  $isActiveAcolyteDefined: boolean;
  $ms: MS;
}>`
  height: ${({ $isActiveAcolyteDefined }) =>
    $isActiveAcolyteDefined ? 50 : 20}%;
  justify-content: ${({ $isUserIstvan, $isActiveAcolyteDefined }) =>
    $isUserIstvan || !$isActiveAcolyteDefined ? 'center' : 'space-between'};
  margin: auto;
  border-radius: 25px;
  padding: ${({ $isActiveAcolyteDefined, $ms }) =>
    $isActiveAcolyteDefined ? 0 : $ms(17.5)}px;
  overflow: hidden;
  background-color: rgb(
    0 0 0 /
      ${({ $isActiveAcolyteDefined }) => ($isActiveAcolyteDefined ? 0 : 1)}
  );
`;

const SelectAcolyteText = styled(Text)`
  color: rgb(191 245 205);
`;

const Actions = ({
  activeAcolyte,
  mortimerMode,
  setMortimerMode,
}: ActionsProps) => {
  const user = usePlayerStore(state => state.user)!;

  const diseases = useDiseaseStore(state => state.diseases);

  const setIsLoading = useIsLoadingStore(state => state.setIsLoading);

  const { ms } = useMetrics();

  let selectAcolyteText = 'Select an acolyte ';

  // Buttons' appearance
  const buttonsCustomStyleObj: ViewStyle = {
    width: ms(315, 0.75),
    height: ms(87.5, 0.75),
  };
  let buttonsBackgroundImgSrc: ButtonBackgroundImgSrc;

  const actions: Action[] = [];

  switch (user.rol) {
    case UserRole.VILLAIN: {
      selectAcolyteText +=
        'to apply them any of the diseases they do not yet have (the opaque ones).';

      if (activeAcolyte) {
        buttonsBackgroundImgSrc = ButtonBackgroundImgSrc.VILLAIN_THEMED;

        // Configure the actions the villain can perform when an acolyte is active
        diseases.forEach(disease => {
          // Options for each action
          const text = `Apply ${disease.name}`;
          let isDisabled: boolean;
          let onPress: VoidFunction;
          let style: ViewStyle | undefined;

          if (activeAcolyte.diseases!.includes(disease._id)) {
            isDisabled = true;
            onPress = () => {};
            style = { opacity: 0.65 };
          } else {
            isDisabled = false;
            onPress = () => {
              emitAcolyteInfected(activeAcolyte._id, disease._id);
            };
          }

          const action: Action = { text, isDisabled, onPress, style };

          actions.push(action);
        });
      }

      break;
    }

    case UserRole.ISTVAN: {
      selectAcolyteText += 'to apply them the fearsome Ethazium curse.';

      if (activeAcolyte) {
        buttonsBackgroundImgSrc = ButtonBackgroundImgSrc.ISTVAN_THEMED;

        actions.push({
          text: 'Apply Ethazium Curse',
          isDisabled: activeAcolyte.isCursed!,
          onPress: () => {
            !activeAcolyte.isCursed && emitAcolyteCursed(activeAcolyte._id);
          },
          style: activeAcolyte.isCursed ? { opacity: 0.65 } : undefined,
        });
      }

      break;
    }

    case UserRole.MORTIMER:
      {
        selectAcolyteText += 'to heal them.';

        if (!activeAcolyte) break;

        buttonsBackgroundImgSrc = ButtonBackgroundImgSrc.MORTIMER_THEMED;

        const hasLowResistance = activeAcolyte.attributes.resistance! <= 30;

        if (mortimerMode === MortimerModeState.DEFAULT) {
          actions.push({
            text: 'Apply Poultice',
            isDisabled: !hasLowResistance,
            onPress: () => {
              hasLowResistance &&
                emitMortimerAidedAcolyte(activeAcolyte._id, AidType.POULTICE);
            },
            style: !hasLowResistance ? { opacity: 0.65 } : undefined,
          });

          actions.push({
            text: 'Remove Curse',
            isDisabled: !activeAcolyte.isCursed,
            onPress: () => {
              activeAcolyte.isCursed &&
                emitMortimerAidedAcolyte(activeAcolyte._id, AidType.ETHAZIUM);
            },
            style: !activeAcolyte.isCursed ? { opacity: 0.65 } : undefined,
          });

          const hasAnyDisease = activeAcolyte.diseases!.length > 0;

          actions.push({
            text: 'Treat Disease',
            isDisabled: !hasAnyDisease,
            onPress: () =>
              hasAnyDisease &&
              setMortimerMode!(MortimerModeState.DISEASE_SELECTION),
            style: !hasAnyDisease ? { opacity: 0.65 } : undefined,
          });
        }
      }

      if (mortimerMode === MortimerModeState.DISEASE_SELECTION) {
        diseases.forEach(disease => {
          const hasDisease = activeAcolyte.diseases!.includes(disease._id);

          actions.push({
            text: `Cure ${disease.name}`,
            isDisabled: !hasDisease,
            onPress: () => {
              if (!hasDisease) return;
              emitMortimerAidedAcolyte(
                activeAcolyte._id,
                AidType.DISEASE,
                disease._id,
              );
              setMortimerMode!(MortimerModeState.DEFAULT);
            },
            style: { opacity: hasDisease ? 1 : 0.65 },
          });
        });

        break;
      }
  }

  function handlePress(action: Action) {
    if (!action.isDisabled && action.text !== 'Treat Disease') {
      setIsLoading(true);
    }

    action.onPress();
  }

  return (
    <Container
      $isUserIstvan={user.rol === UserRole.ISTVAN}
      $isActiveAcolyteDefined={!!activeAcolyte}
      $ms={ms}
    >
      {activeAcolyte ? (
        actions.map(action => (
          <Button
            key={action.text}
            customStyleObj={{ ...buttonsCustomStyleObj, ...action.style }}
            onPress={() => {
              handlePress(action);
            }}
            backgroundImgSrc={buttonsBackgroundImgSrc!}
            text={action.text}
          />
        ))
      ) : (
        <SelectAcolyteText>{selectAcolyteText}</SelectAcolyteText>
      )}
    </Container>
  );
};

export { Actions };
