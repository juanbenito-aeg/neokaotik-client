import { render } from '@testing-library/react-native';
import { MockedPlayer, mockedPlayers } from '../../__mocks__/mockedPlayers';
import Main from '../../components/Main';
import usePlayerStore from '../../store/usePlayerStore';
import { PlayerStore } from '../../interfaces/player';
import { useModalStore } from '../../store/useModalStore';
import { ModalImgSrc } from '../../constants/image-sources';

// Mock unused problematic modules
jest.mock('react-native-google-auth', () => ({}));
jest.mock('../../components/maps/Map', () => jest.fn());
jest.mock('../../fcm/notificationPermission', () => ({
  handleNotificationPermission: jest.fn().mockResolvedValue(''),
}));
jest.mock('../../helpers/fcm.helpers', () => ({ getToastConfig: jest.fn() }));

// Mock the relevant stores
jest.mock('../../store/usePlayerStore');
jest.mock('../../store/useModalStore');

jest.useFakeTimers();

describe("'Main' component", () => {
  let mockedPlayerStore: PlayerStore;

  const mockedSetModalData = jest.fn();

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

    // Set the return value of "useModalStore"
    (useModalStore as unknown as jest.Mock).mockReturnValue(mockedSetModalData);
  });

  beforeEach(() => {
    jest.clearAllMocks();

    // Create a deep copy of "mockedPlayers[MockedPlayer.ACOLYTE]" to avoid directly modifying its nested properties (e.g., "attributes")
    const mockedUser = JSON.parse(
      JSON.stringify(mockedPlayers[MockedPlayer.ACOLYTE]),
    );

    mockedPlayerStore.user = mockedUser;
  });

  describe('when logged-in player is non-betrayer acolyte', () => {
    beforeEach(() => {
      mockedPlayerStore.user!.isBetrayer = false;
    });

    it("should trigger appearance of tiredness modal if acolyte's 'resistance' <= 30", () => {
      mockedPlayerStore.user!.attributes.resistance = 30;

      render(<Main />);

      expect(mockedSetModalData).toHaveBeenCalledWith(
        expect.objectContaining({
          content: {
            message: expect.any(String),
            image: {
              source: ModalImgSrc.TIRED_ACOLYTE,
              width: expect.any(Number),
              height: expect.any(Number),
            },
          },
        }),
      );
    });
  });
});
