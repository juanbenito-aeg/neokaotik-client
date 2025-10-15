import { useContext } from 'react';
import { UserRole } from '../../constants';
import { UserContext } from '../../contexts/UserContext';
import { SetGeneralModalMessage } from '../../interfaces/GeneralModal';
import type { AcolyteDataAfterAccessExitLab } from '../../interfaces/socket';
import { UserContextInterface } from '../../interfaces/UserContext';

function handleAcolyteInsideOutsideLab(
  recipientRole: string,
  acolyteData: AcolyteDataAfterAccessExitLab,
  setGeneralModalMessage?: SetGeneralModalMessage,
  user?: any,
  setUser?: any,
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
      displayTheLabEntryOrExit(acolyteData.isInside, user, setUser);
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

function displayTheLabEntryOrExit(
  isAcolyteInsideLab: boolean,
  user: any,
  setUser: any,
) {
  console.log(user);
  console.log('-----');
  console.log(isAcolyteInsideLab);

  setUser({ ...user, isInside: isAcolyteInsideLab });
}

export { handleAcolyteInsideOutsideLab };
