import { MockedPlayer, mockedPlayers } from '../../../__mocks__/mockedPlayers';
import handleRequestedToShowArtifacts from '../../../socket/handlers/requested-to-show-artifacts';

beforeAll(() => {
  jest.clearAllMocks();
});

const ms = jest.fn();
const setModalData = jest.fn();
const setShowArtifactsAnimation = jest.fn();

describe('handleRequestedToShowArtifacts', () => {
  it('should call setModalData if user rol is Acolyte', () => {
    const user = mockedPlayers[MockedPlayer.ACOLYTE];

    handleRequestedToShowArtifacts(
      user,
      ms,
      setModalData,
      setShowArtifactsAnimation,
    );

    expect(setModalData).toHaveBeenCalled();
    expect(setShowArtifactsAnimation).not.toHaveBeenCalled();
  });
});
