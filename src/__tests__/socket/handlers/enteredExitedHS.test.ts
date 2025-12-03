import { mockedPlayers, MockedPlayer } from '../../../__mocks__/mockedPlayers';
import handleEnteredExitedHS from '../../../socket/handlers/entered-exited-hs';

const isInsideHS = true;
const acolytes = [mockedPlayers[MockedPlayer.ACOLYTE]];
const setAcolytes = jest.fn();
const setNonAcolytes = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('handleEnteredExitedHS', () => {
  it("should call 'setAcolytes' (not 'setNonAcolytes') when the updated player is an acolyte", () => {
    const acolyteId = mockedPlayers[MockedPlayer.ACOLYTE]._id;

    handleEnteredExitedHS(
      acolyteId,
      isInsideHS,
      acolytes,
      setAcolytes,
      setNonAcolytes,
    );

    expect(setAcolytes).toHaveBeenCalled();
    expect(setNonAcolytes).not.toHaveBeenCalled();
  });

  it("should call 'setNonAcolytes' (not 'setAcolytes') when the updated player is anything but an acolyte", () => {
    const nonAcolyteId = mockedPlayers[MockedPlayer.NON_ACOLYTE]._id;

    handleEnteredExitedHS(
      nonAcolyteId,
      isInsideHS,
      acolytes,
      setAcolytes,
      setNonAcolytes,
    );

    expect(setNonAcolytes).toHaveBeenCalled();
    expect(setAcolytes).not.toHaveBeenCalled();
  });
});
