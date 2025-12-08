import { MockedPlayer, mockedPlayers } from '../../../__mocks__/mockedPlayers';
import { Location } from '../../../interfaces/geolocalization';
import handleAcolytePositionChanged from '../../../socket/handlers/acolyte-position-changed';

const setAcolytes = jest.fn();
const location: Location = { type: 'Point', coordinates: [-45555, 21345] };

describe('handleAcolytePositionChanged', () => {
  it('should change acolyte position', () => {
    handleAcolytePositionChanged(
      setAcolytes,
      mockedPlayers[MockedPlayer.ACOLYTE]._id,
      location,
    );

    expect(setAcolytes).toHaveBeenCalled();
  });
});
