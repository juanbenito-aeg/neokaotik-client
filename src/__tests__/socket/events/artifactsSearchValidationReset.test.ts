import { SocketClientToServerEvents } from '../../../constants/socket';
import emitArtifactsSearchValidationOrReset from '../../../socket/events/artifacts-search-validation-reset';
import { socket } from '../../../socket/socket';

let mockEmit: jest.Mock;

beforeEach(() => {
  mockEmit = jest.fn();

  jest.spyOn(socket, 'emit').mockImplementation(mockEmit);
});

it('should emit artifacts search validation/reset socket event', () => {
  const isSearchValidated = false;

  emitArtifactsSearchValidationOrReset(isSearchValidated);

  expect(mockEmit).toHaveBeenCalledWith(
    SocketClientToServerEvents.ARTIFACTS_SEARCH_VALIDATION_RESET,
    isSearchValidated,
  );
});
