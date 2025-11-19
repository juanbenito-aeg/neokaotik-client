import { SocketClientToServerEvents } from '../../constants';
import { socket } from '../socket';

function handleAcolyteScrollAction(isPressed: boolean) {
  socket.emit(SocketClientToServerEvents.SCROLL_PRESS, isPressed);
}

export { handleAcolyteScrollAction };
