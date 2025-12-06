import { PermissionsAndroid } from 'react-native';
import { handleNotificationPermission } from '../../fcm/notificationPermission';
import { deviceTokenToRefresh } from '../../fcm/deviceToken';

// Mock Node modules
jest.spyOn(PermissionsAndroid, 'check').mockResolvedValue(false);
jest
  .spyOn(PermissionsAndroid, 'request')
  .mockResolvedValueOnce(PermissionsAndroid.RESULTS.GRANTED)
  .mockResolvedValueOnce(PermissionsAndroid.RESULTS.DENIED);

// Mock our modules
jest.mock('../../fcm/deviceToken', () => ({ deviceTokenToRefresh: jest.fn() }));

beforeEach(() => {
  jest.clearAllMocks();
});

const userEmail = 'juan.benito@ikasle.aeg.eus';

describe("'handleNotificationPermission' function", () => {
  it('should call a function that registers a handler to refresh the device (push) token if the permission is granted', async () => {
    const notPermissionDeniedMessage = await handleNotificationPermission(
      userEmail,
    );

    expect(deviceTokenToRefresh).toHaveBeenCalledWith(userEmail);
    expect(notPermissionDeniedMessage).toBeUndefined();
  });

  it('should return a string to be used in a modal if the permission is denied', async () => {
    const permissionDeniedMessage = await handleNotificationPermission(
      userEmail,
    );

    expect(deviceTokenToRefresh).not.toHaveBeenCalled();
    expect(permissionDeniedMessage).toBe(
      'You have to enable notifications from system settings to receive alerts.',
    );
  });
});
