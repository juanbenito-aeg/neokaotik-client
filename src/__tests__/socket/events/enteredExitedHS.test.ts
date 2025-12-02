import { SocketClientToServerEvents } from '../../../constants';

jest.mock('socket.io-client');

let socket: any;
let io: any;

beforeEach(() => {
  socket = {
    on: jest.fn(),
    emit: jest.fn(),
    disconnect: jest.fn(),
  };
});

it('should emit an entered-exited-hs socket event', () => {
  const isInsideHS: boolean = true;

  socket.emit(SocketClientToServerEvents.ENTERED_EXITED_HS, isInsideHS);

  expect(socket.emit).toHaveBeenCalledWith(
    SocketClientToServerEvents.ENTERED_EXITED_HS,
    isInsideHS,
  );
});
