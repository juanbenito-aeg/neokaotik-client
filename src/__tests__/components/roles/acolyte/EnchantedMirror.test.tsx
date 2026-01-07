import { render, screen, userEvent } from '@testing-library/react-native';
import EnchantedMirror from '../../../../components/roles/acolyte/EnchantedMirror';
import usePlayerStore from '../../../../store/usePlayerStore';
import {
  MockedPlayer,
  mockedPlayers,
} from '../../../../__mocks__/mockedPlayers';
import { socket } from '../../../../socket/socket';
import { SocketClientToServerEvents } from '../../../../constants/socket';

jest.mock('../../../../store/usePlayerStore');

describe("'EnchantedMirror' component", () => {
  const mockedNonBetrayerAcolyte = {
    ...mockedPlayers[MockedPlayer.ACOLYTE],
    isBetrayer: false,
  };

  (usePlayerStore as unknown as jest.Mock).mockImplementation(getterFn =>
    getterFn({
      user: mockedNonBetrayerAcolyte,
    }),
  );

  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  jest.useFakeTimers();

  it("should emit 'acolyte rested' when 'Rest' is pressed", async () => {
    // Ensure the "Rest" button is displayed
    mockedNonBetrayerAcolyte.attributes.resistance = 99;

    render(<EnchantedMirror />);

    const restButton = screen.getByText('Rest');
    await user.press(restButton);

    expect(socket.emit).toHaveBeenCalledWith(
      SocketClientToServerEvents.ACOLYTE_RESTED,
      mockedNonBetrayerAcolyte._id,
    );
  });
});
