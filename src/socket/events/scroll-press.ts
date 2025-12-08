import { SocketClientToServerEvents } from '../../constants/socket';
import { socket } from '../socket';

function handleAcolyteScrollAction(isPressed: boolean) {
  socket.emit(SocketClientToServerEvents.SCROLL_PRESS, isPressed);
}

export { handleAcolyteScrollAction };
