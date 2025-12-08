import { MockedPlayer, mockedPlayers } from '../../../__mocks__/mockedPlayers';
import { UserRole } from '../../../constants/general';
import { SocketServerToClientEvents } from '../../../constants/socket';
import KaotikaUser from '../../../interfaces/KaotikaUser';
import { AcolyteDataAfterAccessExitLab } from '../../../interfaces/socket';
import { socket, initSocket } from '../../../socket/socket';

const ms = jest.fn();
const setModalData = jest.fn();
const setUser = jest.fn();
const setAcolytes = jest.fn();
const setNonAcolytes = jest.fn();
const setArtifacts = jest.fn();
const setShowArtifactsAnimation = jest.fn();

const acolyte = mockedPlayers[MockedPlayer.ACOLYTE];
const acolyteData: AcolyteDataAfterAccessExitLab = {
  email: acolyte.email,
  isInside: !acolyte.isInside /* Updated "isInside" field from the server */,
  nickname: acolyte.nickname,
  avatar: acolyte.avatar,
};
const acolytes = [acolyte];

(socket.on as jest.Mock).mockImplementation(
  (event: SocketServerToClientEvents, callback) => {
    if (event === SocketServerToClientEvents.ACOLYTE_INSIDE_OUTSIDE_LAB) {
      callback(acolyteData);
    }
  },
);

describe("'handleAcolyteInsideOutsideLab' socket event handler", () => {
  it("should display a modal informing about an acolyte's entry/exit to/from Angelo's laboratory if the recipient is Istvan", () => {
    const recipient: KaotikaUser = {
      ...mockedPlayers[MockedPlayer.NON_ACOLYTE],
      rol: UserRole.ISTVAN,
    };

    initSocket(
      ms,
      setModalData,
      recipient,
      setUser,
      acolytes,
      setAcolytes,
      setNonAcolytes,
      setArtifacts,
      setShowArtifactsAnimation,
    );

    const modalMessage = `The acolyte named ${acolyteData.nickname} has just ${
      acolyteData.isInside ? 'entered' : 'exited'
    } Angelo's laboratory.`;

    expect(setModalData).toHaveBeenCalledWith(
      expect.objectContaining({ content: { message: modalMessage } }),
    );
  });

  it("should update the 'acolytes' state with the relevant acolyte's 'isInside' field up to date if the recipient is Mortimer", () => {
    const recipient: KaotikaUser = {
      ...mockedPlayers[MockedPlayer.NON_ACOLYTE],
      rol: UserRole.MORTIMER,
    };

    initSocket(
      ms,
      setModalData,
      recipient,
      setUser,
      acolytes,
      setAcolytes,
      setNonAcolytes,
      setArtifacts,
      setShowArtifactsAnimation,
    );

    expect(setAcolytes).toHaveBeenCalledWith([
      { ...acolyte, isInside: acolyteData.isInside },
    ]);
  });

  it("should update the 'user' state with the 'isInside' field up to date if the recipient is the relevant acolyte", () => {
    const recipient = acolyte;

    initSocket(
      ms,
      setModalData,
      recipient,
      setUser,
      acolytes,
      setAcolytes,
      setNonAcolytes,
      setArtifacts,
      setShowArtifactsAnimation,
    );

    const setUserUpdaterFunctionReturnValue =
      setUser.mock.calls[0][0](recipient);

    expect(setUserUpdaterFunctionReturnValue).toEqual({
      ...recipient,
      isInside: acolyteData.isInside,
    });
  });
});
