import { UserRole } from '../../constants';
import { SetGeneralModalMessage } from '../../interfaces/GeneralModal';
import type { AcolyteDataAfterAccessExitLab } from '../../interfaces/socket';

function handleAcolyteInsideOutsideLab(
  recipientRole: string,
  acolyteData: AcolyteDataAfterAccessExitLab,
  setGeneralModalMessage?: SetGeneralModalMessage,
) {
  switch (recipientRole) {
    case UserRole.ISTVAN:
      displayAcolyteEnteredExitedModal(
        setGeneralModalMessage!,
        acolyteData.nickname,
        acolyteData.isInside,
      );
      break;
  }
}

function displayAcolyteEnteredExitedModal(
  setGeneralModalMessage: SetGeneralModalMessage,
  acolyteNickname: string,
  isAcolyteInsideLab: boolean,
) {
  const message = `The acolyte named ${acolyteNickname} has just ${
    isAcolyteInsideLab ? 'entered' : 'exited'
  } Angelo's laboratory.`;

  setGeneralModalMessage(message);
}

export { handleAcolyteInsideOutsideLab };
