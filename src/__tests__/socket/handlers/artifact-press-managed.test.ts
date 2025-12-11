import handlerArtifactPressManaged from '../../../socket/handlers/artifact-press-managed';
import { MS } from '../../../interfaces/Metrics';
import { SetAcolytes } from '../../../interfaces/player';
import { SetModalData } from '../../../interfaces/Modal';
import KaotikaUser from '../../../interfaces/KaotikaUser';
import { mockedPlayers, MockedPlayer } from '../../../__mocks__/mockedPlayers';
import { SetArtifacts } from '../../../interfaces/Artifact';
import mockArtifacts from '../../../__mocks__/mockArtifacts';

// Mock the navigate function
jest.mock('../../../RootNavigation', () => ({
  navigate: jest.fn(),
}));

const mockedAcolyte = mockedPlayers[MockedPlayer.ACOLYTE];
const setIsLoading = jest.fn();

describe('handlerArtifactPressManaged', () => {
  let ms: MS;
  let setModalData: SetModalData;
  let setAcolytes: SetAcolytes;
  let setArtifacts: SetArtifacts;
  let acolytes: KaotikaUser[];

  beforeEach(() => {
    setModalData = jest.fn();
    ms = jest.fn().mockReturnValue(1);
    setAcolytes = jest.fn() as jest.Mock<SetAcolytes>;
    setArtifacts = jest.fn(nextArtifacts => {
      if (typeof nextArtifacts === 'function') {
        return nextArtifacts(mockArtifacts);
      }

      return nextArtifacts;
    });

    acolytes = [
      {
        ...mockedAcolyte,
        found_artifacts: ['artifact_1', 'artifact_2', 'artifact_3'],
      },
    ];
  });

  it('should update acolytes when the function is called', () => {
    handlerArtifactPressManaged(
      ms,
      setModalData,
      setAcolytes,
      mockedAcolyte._id,
      'artifact_4',
      setArtifacts,
      mockedAcolyte,
      setIsLoading,
      true,
    );

    expect(setAcolytes).toHaveBeenCalled();
  });

  it("shouldn't display modal if fewer that 4 artifacts are collected", () => {
    handlerArtifactPressManaged(
      ms,
      setModalData,
      setAcolytes,
      mockedAcolyte._id,
      'artifact_1',
      setArtifacts,
      mockedAcolyte,
      setIsLoading,
      true,
    );

    expect(setModalData).not.toHaveBeenCalled();
  });

  it('should display modal if 4 artifacts are collected', () => {
    (setAcolytes as jest.Mock).mockImplementationOnce(updater => {
      if (typeof updater === 'function') {
        return updater(acolytes);
      }
      return updater;
    });

    handlerArtifactPressManaged(
      ms,
      setModalData,
      setAcolytes,
      mockedAcolyte._id,
      'artifact_4',
      setArtifacts,
      mockedAcolyte,
      setIsLoading,
      true,
    );

    expect(setAcolytes).toHaveBeenCalledTimes(1);

    expect(setModalData).toHaveBeenCalled();
  });

  it('should display modal if isArtifactCollected is false', () => {
    handlerArtifactPressManaged(
      ms,
      setModalData,
      setAcolytes,
      mockedAcolyte._id,
      'artifact_4',
      setArtifacts,
      mockedAcolyte,
      setIsLoading,
      false,
    );

    expect(setModalData).toHaveBeenCalled();
    expect(setAcolytes).not.toHaveBeenCalled();
  });
});
