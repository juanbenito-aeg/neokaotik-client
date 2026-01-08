import { SocketClientToServerEvents } from '../../constants/socket';
import { socket } from '../socket';

function emitPlayerVoteInAngeloTrial(playerId: string, playerVote: string) {
  socket.emit(
    SocketClientToServerEvents.PLAYER_VOTED_IN_ANGELO_TRIAL,
    playerId,
    playerVote,
  );
}

export default emitPlayerVoteInAngeloTrial;
