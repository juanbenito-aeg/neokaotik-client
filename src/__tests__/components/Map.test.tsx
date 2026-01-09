import { render, screen, userEvent } from '@testing-library/react-native';
import Map from '../../components/maps/Map';
import { NavigationContainer } from '@react-navigation/native';
import { StoreApi, UseBoundStore } from 'zustand';
import { MapStore } from '../../interfaces/Map';
import useMapStore from '../../store/useMapStore';
import usePlayerStore from '../../store/usePlayerStore';
import { PlayerStore } from '../../interfaces/player';
import { MockedPlayer, mockedPlayers } from '../../__mocks__/mockedPlayers';
import { MapNavigation } from '../../constants/navigation';

// Mock unused problematic components
jest.mock('../../components/maps/OldSchoolMap', () => jest.fn());
jest.mock('../../components/Swamp', () => jest.fn());

// Mock the relevant stores
jest.mock('../../store/useMapStore');
jest.mock('../../store/usePlayerStore');

describe("'Map' component", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not allow a betrayer acolyte to enter 'The Old School'", async () => {
    const mockedSetMapNavigation = jest.fn();

    (useMapStore as unknown as jest.Mock).mockImplementation(
      (getterFn: UseBoundStore<StoreApi<MapStore>>) => {
        const actualState = jest
          .requireActual('../../store/useMapStore')
          .default.getInitialState();

        return getterFn({
          ...actualState,
          setMapNavigation: mockedSetMapNavigation,
        });
      },
    );

    (usePlayerStore as unknown as jest.Mock).mockImplementation(
      (getterFn: UseBoundStore<StoreApi<PlayerStore>>) => {
        const actualState = jest
          .requireActual('../../store/usePlayerStore')
          .default.getInitialState();

        const betrayerAcolyte = {
          ...mockedPlayers[MockedPlayer.ACOLYTE],
          isBetrayer: true,
        };

        return getterFn({
          ...actualState,
          user: betrayerAcolyte,
        });
      },
    );

    const mockedRoute = {
      params: {
        screenChangingNotificationData: undefined,
        tabBarStyle: {},
      },
    };

    const componentTreeToRender = (
      <NavigationContainer>
        <Map route={mockedRoute} />
      </NavigationContainer>
    );

    render(componentTreeToRender);

    const oldSchoolButton = screen.getByTestId('old-school-button');
    await user.press(oldSchoolButton);

    expect(mockedSetMapNavigation).not.toHaveBeenCalledWith(
      MapNavigation.OLD_SCHOOL_MAP,
    );
  });
});
