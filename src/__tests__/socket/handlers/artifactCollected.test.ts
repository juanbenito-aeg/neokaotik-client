import handlerArtifactCollected from '../../../socket/handlers/artifact-collected';
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

describe('handleArtifactCollected', () => {
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
    handlerArtifactCollected(
      ms,
      setModalData,
      setAcolytes,
      mockedAcolyte._id,
      'artifact_4',
      setArtifacts,
      mockedAcolyte,
    );

    expect(setAcolytes).toHaveBeenCalled();
  });

  it("shouldn't display modal if fewer that 4 artifacts are collected", () => {
    handlerArtifactCollected(
      ms,
      setModalData,
      setAcolytes,
      mockedAcolyte._id,
      'artifact_1',
      setArtifacts,
      mockedAcolyte,
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

    handlerArtifactCollected(
      ms,
      setModalData,
      setAcolytes,
      mockedAcolyte._id,
      'artifact_4',
      setArtifacts,
      mockedAcolyte,
    );

    expect(setAcolytes).toHaveBeenCalledTimes(1);

    expect(setModalData).toHaveBeenCalled();
  });
});
