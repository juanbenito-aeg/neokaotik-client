import { UserRole } from '../../constants';
import { SetAcolytes } from '../../interfaces/Acolytes';
import { SetModalData } from '../../interfaces/Modal';
import KaotikaUser from '../../interfaces/KaotikaUser';
import type { AcolyteDataAfterAccessExitLab } from '../../interfaces/socket';
import { SetUser } from '../../interfaces/UserContext';

function handleAcolyteInsideOutsideLab(
  recipientRole: string,
  acolyteData: AcolyteDataAfterAccessExitLab,
  setModalData?: SetModalData,
  acolytes?: KaotikaUser[],
  setAcolytes?: SetAcolytes,
  user?: KaotikaUser,
  setUser?: SetUser,
) {
  switch (recipientRole) {
    case UserRole.ISTVAN:
      displayAcolyteEnteredExitedModal(
        setModalData!,
        acolyteData.nickname,
        acolyteData.isInside,
      );
      break;

    case UserRole.MORTIMER:
      updateAcolytes(
        acolyteData.email,
        acolyteData.isInside,
        acolytes!,
        setAcolytes!,
      );
      break;

    case UserRole.ACOLYTE:
      enterOrExitLab(acolyteData.isInside, user!, setUser!);
      break;
  }
}

function displayAcolyteEnteredExitedModal(
  setGeneralModalMessage: SetModalData,
  acolyteNickname: string,
  isAcolyteInsideLab: boolean,
) {
  const message = `The acolyte named ${acolyteNickname} has just ${
    isAcolyteInsideLab ? 'entered' : 'exited'
  } Angelo's laboratory.`;

  setGeneralModalMessage(message);
}

function updateAcolytes(
  acolyteEmail: string,
  isAcolyteInsideLab: boolean,
  acolytes: KaotikaUser[],
  setAcolytes: SetAcolytes,
) {
  const updatedAcolytes = acolytes.map(acolyte => {
    if (acolyte.email === acolyteEmail) {
      return { ...acolyte, isInside: isAcolyteInsideLab };
    } else {
      return acolyte;
    }
  });

  setAcolytes(updatedAcolytes);
}

function enterOrExitLab(
  isAcolyteInsideLab: boolean,
  user: KaotikaUser,
  setUser: SetUser,
) {
  setUser({ ...user, isInside: isAcolyteInsideLab });
}

export { handleAcolyteInsideOutsideLab, updateAcolytes };
