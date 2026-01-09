import { AidType } from '../../constants/general';
import { SocketClientToServerEvents } from '../../constants/socket';
import { socket } from '../socket';

function emitMortimerAidedAcolyte(
  acolyteId: string,
  aidType: AidType,
  diseaseId?: string,
) {
  socket.emit(
    SocketClientToServerEvents.MORTIMER_AIDED_ACOLYTE,
    acolyteId,
    aidType,
    diseaseId,
  );
}

export default emitMortimerAidedAcolyte;
