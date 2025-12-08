import { MockedPlayer, mockedPlayers } from '../../../__mocks__/mockedPlayers';
import { updateAcolyteOrMortimerEnteredOrExitedHS } from '../../../socket/events/entered-exited-hs';
import { socket } from '../../../socket/socket';

jest.mock('../../../socket/socket', () => ({
  socket: {
    timeout: jest.fn(),
    emit: jest.fn(),
  },
}));

let mockEmit: jest.Mock;

beforeEach(() => {
  mockEmit = jest.fn();

  (socket.timeout as jest.Mock).mockReturnValue({
    emit: mockEmit,
  });
});

it('should emit an entered-exited-hs socket event', () => {
  const isInsideHS = true;

  updateAcolyteOrMortimerEnteredOrExitedHS(
    mockedPlayers[MockedPlayer.ACOLYTE]._id,
    isInsideHS,
  );

  expect(mockEmit).toHaveBeenCalled();
});
