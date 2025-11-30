import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { handleBackgroundOrQuitNotification } from '../../helpers/fcm.helpers';
import {
  DeviceState,
  NotificationTitle,
  OldSchoolLocation,
} from '../../constants';
import { MockedPlayer, mockedPlayers } from '../../__mocks__/mockedPlayers';
import { navigate } from '../../RootNavigation';
import { waitFor } from '@testing-library/react-native';

jest.mock('@react-native-firebase/messaging', () => jest.fn());

jest.mock('@react-native-async-storage/async-storage', () => {
  const mockedAsyncStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };

  return mockedAsyncStorage;
});

jest.mock('../../RootNavigation');

// Arrange (1)
const setModalData = jest.fn();
const ms = jest.fn();
const remoteMessage: FirebaseMessagingTypes.RemoteMessage = {
  messageId: 'messageId',
  data: {
    destination: OldSchoolLocation.HALL_OF_SAGES,
  },
  notification: {
    title: NotificationTitle.SUMMONED_HALL_SAGES,
  },
  fcmOptions: {},
};
const deviceState = DeviceState.BACKGROUND;
const setAcolytes = jest.fn();
let acolyte = mockedPlayers[MockedPlayer.ACOLYTE];
const setUser = jest.fn();

describe("'Summoned to The Hall of Sages' notification", () => {
  it("should not move the acolyte to THoS when they are inside Angelo's laboratory or The Swamp Tower", async () => {
    // Arrange (2)
    acolyte = { ...acolyte, isInside: true };

    // Act
    handleBackgroundOrQuitNotification(
      setModalData,
      ms,
      remoteMessage,
      deviceState,
      setAcolytes,
      acolyte,
      setUser,
    );

    // Assert
    await waitFor(() => {
      expect(navigate).not.toHaveBeenCalled();
    });
  });

  it("should move the acolyte to THoS when they are anywhere but Angelo's laboratory & The Swamp Tower", async () => {
    // Arrange (2)
    acolyte = { ...acolyte, isInside: false, is_inside_tower: false };

    // Act
    handleBackgroundOrQuitNotification(
      setModalData,
      ms,
      remoteMessage,
      deviceState,
      setAcolytes,
      acolyte,
      setUser,
    );

    // Assert
    await waitFor(() => {
      expect(navigate).toHaveBeenCalled();
    });
  });
});
