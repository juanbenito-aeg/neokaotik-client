import { SocketClientToServerEvents } from '../../constants';

jest.mock('socket.io-client');

let socket: any;
let io: any;

beforeEach(() => {
  socket = {
    on: jest.fn(),
    emit: jest.fn(),
    disconnect: jest.fn(),
  };
  io = jest.fn().mockReturnValue(socket);
});

it('should emit an entered-exited-hs socket event', () => {
  const isInsideHS: boolean = true;
  socket.emit.mockImplementation(
    (event: SocketClientToServerEvents, callback: Function) => {
      if (event === SocketClientToServerEvents.ENTERED_EXITED_HS) {
        callback(isInsideHS);
      }

      expect(socket.emit).toHaveBeenCalled();
      expect(isInsideHS).toBe(true);
    },
  );
});
