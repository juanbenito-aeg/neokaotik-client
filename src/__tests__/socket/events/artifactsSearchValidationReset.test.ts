import { SocketClientToServerEvents } from '../../../constants';

jest.mock('socket.io-client');

let socket: any;

beforeEach(() => {
  socket = {
    on: jest.fn(),
    emit: jest.fn(),
    disconnect: jest.fn(),
  };
});

it('should emit artifacts search validation/reset socket event', () => {
  const isSearchValidated: boolean = false;

  socket.emit(
    SocketClientToServerEvents.ARTIFACTS_SEARCH_VALIDATION_RESET,
    isSearchValidated,
  );

  expect(socket.emit).toHaveBeenCalledWith(
    SocketClientToServerEvents.ARTIFACTS_SEARCH_VALIDATION_RESET,
    isSearchValidated,
  );
});
