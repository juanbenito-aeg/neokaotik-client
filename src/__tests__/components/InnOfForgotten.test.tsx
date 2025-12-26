import { fireEvent, render, screen } from '@testing-library/react-native';
import InnOfForgotten from '../../components/InnOfForgotten';
import { MockedPlayer, mockedPlayers } from '../../__mocks__/mockedPlayers';
import { useModalStore } from '../../store/useModalStore';
import { emitAcolyteAcceptedBetrayal } from '../../socket/events/acolyte-accepted-betrayal';
import { emitAngeloSubdued } from '../../socket/events/angelo-subdued';

jest.mock('../../store/usePlayerStore', () => {
  const actualState = jest
    .requireActual<typeof import('../../store/usePlayerStore')>(
      '../../store/usePlayerStore',
    )
    .default.getInitialState();

  return {
    __esModule: true,
    default: jest.fn(selector =>
      selector({
        ...actualState,
        user: mockedPlayers[MockedPlayer.ACOLYTE],
        nonAcolytes: [
          {
            nickname: 'Angelo di Mortis',
            location: 'The Inn of the Forgotten',
          },
        ],
      }),
    ),
  };
});

jest.mock('../../store/useModalStore', () => ({
  __esModule: true,
  useModalStore: jest.fn(),
}));

jest.mock('../../socket/events/acolyte-accepted-betrayal', () => ({
  emitAcolyteAcceptedBetrayal: jest.fn(),
}));

jest.mock('../../socket/events/angelo-subdued', () => ({
  emitAngeloSubdued: jest.fn(),
}));

describe('The Inn of the Forgotten', () => {
  const setModalDataMock = jest.fn();

  beforeEach(() => {
    // -- Standard implementation for the selector (state => state.setModalData) --
    (useModalStore as unknown as jest.Mock).mockImplementation(selector => {
      const state = {
        setModalData: setModalDataMock,
        modalData: null,
      };
      return selector(state);
    });
  });

  it('should render InnOfForgotten correctly', () => {
    render(<InnOfForgotten onPressGoBackButton={() => {}} />);

    expect(screen.getByText('The Inn of the Forgotten')).toBeTruthy();
  });

  it('should call setModalData if the user is not a betrayer', () => {
    render(<InnOfForgotten onPressGoBackButton={() => {}} />);

    expect(setModalDataMock).toHaveBeenCalledWith(
      expect.objectContaining({
        fullScreen: true,
        actionButtonTextOne: 'Swear loyalty to the Brotherhood',
      }),
    );
  });

  it('should emit a socket event if acolyte accepts the offer', () => {
    render(<InnOfForgotten onPressGoBackButton={() => {}} />);

    const passedModalData = setModalDataMock.mock.calls[0][0];

    passedModalData.onPressActionButtonOne();

    expect(emitAcolyteAcceptedBetrayal).toHaveBeenCalledWith(
      mockedPlayers[MockedPlayer.ACOLYTE]._id,
    );
  });

  it('should emit a socket event if the acolyte presses on Angelo', () => {
    render(<InnOfForgotten onPressGoBackButton={() => {}} />);

    const angeloButton = screen.getByTestId('angelo-pressed');

    fireEvent.press(angeloButton);

    expect(emitAngeloSubdued).toHaveBeenCalled();
  });
});
