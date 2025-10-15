import { UserRole } from '../../constants';
import { SetGeneralModalMessage } from '../../interfaces/GeneralModal';
import KaotikaUser from '../../interfaces/KaotikaUser';
import type { AcolyteDataAfterAccessExitLab } from '../../interfaces/socket';
import { SetUser, UserContextInterface } from '../../interfaces/UserContext';

function handleAcolyteInsideOutsideLab(
  recipientRole: string,
  acolyteData: AcolyteDataAfterAccessExitLab,
  setGeneralModalMessage?: SetGeneralModalMessage,
  user?: KaotikaUser,
  setUser?: SetUser,
) {
  switch (recipientRole) {
    case UserRole.ISTVAN:
      displayAcolyteEnteredExitedModal(
        setGeneralModalMessage!,
        acolyteData.nickname,
        acolyteData.isInside,
      );
      break;

    case UserRole.ACOLYTE:
      enterOrExitLab(acolyteData.isInside, user!, setUser!);
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

function enterOrExitLab(
  isAcolyteInsideLab: boolean,
  user: KaotikaUser,
  setUser: SetUser,
) {
  setUser({ ...user, isInside: isAcolyteInsideLab });
}

export { handleAcolyteInsideOutsideLab };
