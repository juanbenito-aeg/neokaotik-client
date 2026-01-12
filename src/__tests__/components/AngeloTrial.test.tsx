import { render } from '@testing-library/react-native';
import { MockedPlayer, mockedPlayers } from '../../__mocks__/mockedPlayers';
import AngeloTrial from '../../components/AngeloTrial';
import { PlayerStore } from '../../interfaces/player';
import usePlayerStore from '../../store/usePlayerStore';
import { socket } from '../../socket/socket';
import { SocketClientToServerEvents } from '../../constants/socket';
import { AngeloTrialState, VoteAngeloTrialType } from '../../constants/general';
import { useHallOfSageStore } from '../../store/useHallOfSageStore';

jest.mock('../../store/usePlayerStore');
jest.mock('../../store/useHallOfSageStore');

describe("'AngeloTrial' component", () => {
  let mockedPlayerStore: PlayerStore;

  beforeAll(() => {
    // Set the implementation of "usePlayerStore"

    const actualPlayerStore = jest
      .requireActual<typeof import('../../store/usePlayerStore')>(
        '../../store/usePlayerStore',
      )
      .default.getInitialState();

    mockedPlayerStore = { ...actualPlayerStore };

    (usePlayerStore as unknown as jest.Mock).mockImplementation(getterFn =>
      getterFn(mockedPlayerStore),
    );
  });

  beforeEach(() => {
    jest.clearAllMocks();

    // Create a deep copy of "mockedPlayers[MockedPlayer.ACOLYTE]" to avoid directly modifying its nested properties (e.g., "attributes")
    const mockedUser = JSON.parse(
      JSON.stringify(mockedPlayers[MockedPlayer.ACOLYTE]),
    );

    mockedPlayerStore.user = mockedUser;
  });

  it("should emit 'scratch' vote when full-screen modal is activated due to tiredness, new disease(s) and/or curse", () => {
    // Set the return value of "useHallOfSageStore"
    (useHallOfSageStore as unknown as jest.Mock).mockReturnValue(
      AngeloTrialState.ACTIVE,
    );

    mockedPlayerStore.user!.attributes.resistance = 30;

    render(<AngeloTrial />);

    expect(socket.emit).toHaveBeenCalledWith(
      SocketClientToServerEvents.PLAYER_VOTED_IN_ANGELO_TRIAL,
      mockedPlayerStore.user!._id,
      VoteAngeloTrialType.NONE,
    );
  });
});
