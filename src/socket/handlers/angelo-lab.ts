import { DEFAULT_MODAL_DATA, UserRole } from '../../constants/general';
import { SetAcolytes } from '../../interfaces/player';
import { SetModalData } from '../../interfaces/Modal';
import KaotikaUser from '../../interfaces/KaotikaUser';
import type { AcolyteDataAfterAccessExitLab } from '../../interfaces/socket';
import { SetUser } from '../../interfaces/player';

function handleAcolyteInsideOutsideLab(
  recipientRole: string,
  acolyteData: AcolyteDataAfterAccessExitLab,
  setModalData?: SetModalData,
  acolytes?: KaotikaUser[],
  setAcolytes?: SetAcolytes,
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
      enterOrExitLab(acolyteData.isInside, setUser!);
      break;
  }
}

function displayAcolyteEnteredExitedModal(
  setModalData: SetModalData,
  acolyteNickname: string,
  isAcolyteInsideLab: boolean,
) {
  const message = `The acolyte named ${acolyteNickname} has just ${
    isAcolyteInsideLab ? 'entered' : 'exited'
  } Angelo's laboratory.`;

  setModalData({ ...DEFAULT_MODAL_DATA, content: { message } });
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

function enterOrExitLab(isAcolyteInsideLab: boolean, setUser: SetUser) {
  setUser(prevUser => ({ ...prevUser!, isInside: isAcolyteInsideLab }));
}

function handleAcolyteDisconnected(
  acolyteEmail: string,
  acolytes: KaotikaUser[],
  setAcolytes: SetAcolytes,
) {
  const isAcolyteInsideLab = false;

  updateAcolytes(acolyteEmail, isAcolyteInsideLab, acolytes, setAcolytes);
}

export { handleAcolyteInsideOutsideLab, handleAcolyteDisconnected };
