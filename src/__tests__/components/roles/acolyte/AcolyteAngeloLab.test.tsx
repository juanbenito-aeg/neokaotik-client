import { render, screen } from '@testing-library/react-native';
import AcolyteAngeloLab from '../../../../components/roles/acolyte/AcolyteAngeloLab';
import {
  MockedPlayer,
  mockedPlayers,
} from '../../../../__mocks__/mockedPlayers';
import { NavigationContainer } from '@react-navigation/native';
import usePlayerStore from '../../../../store/usePlayerStore';
import KaotikaUser from '../../../../interfaces/KaotikaUser';

// Mock the player store

jest.mock('../../../../store/usePlayerStore');

const acolyte: KaotikaUser = mockedPlayers[MockedPlayer.ACOLYTE];
const mockedUsePlayerStore = jest.mocked(usePlayerStore);
mockedUsePlayerStore.mockReturnValue(acolyte);

// Mock the "@react-navigation/native" package
jest.mock('@react-navigation/native', () => {
  const actualModule = jest.requireActual('@react-navigation/native');

  return {
    ...actualModule,
    useNavigation: jest.fn(() => ({ setOptions: jest.fn() })),
  };
});

jest.useFakeTimers();

const componentTreeToRender = (
  <NavigationContainer>
    <AcolyteAngeloLab onPressGoBackButton={() => {}} />
  </NavigationContainer>
);

describe("'AcolyteAngeloLab' component", () => {
  it("should display a QR code to access Angelo's laboratory when acolyte's 'isInside' field equals false", () => {
    acolyte.isInside = false;

    render(componentTreeToRender);

    expect(screen.getByTestId('outer-qr-code-container')).toBeOnTheScreen();
    expect(screen.queryByTestId('inner-qr-code-container')).toBeNull();
  });

  it("should display a QR code to exit Angelo's laboratory when acolyte's 'isInside' field equals true", async () => {
    acolyte.isInside = true;

    render(componentTreeToRender);

    expect(screen.getByTestId('inner-qr-code-container')).toBeOnTheScreen();
    expect(screen.queryByTestId('outer-qr-code-container')).toBeNull();
  });
});
