import handlerArtifactCollected from '../../socket/handlers/artifact-collected';
import { MS } from '../../interfaces/Metrics';
import { SetAcolytes } from '../../interfaces/player';
import { SetModalData } from '../../interfaces/Modal';
import KaotikaUser from '../../interfaces/KaotikaUser';
import player from '../../__mocks__/player.json';

// Mock the navigate function
jest.mock('../../RootNavigation', () => ({
  navigate: jest.fn(),
}));

describe('handleArtifactCollected', () => {
  let setModalData: SetModalData;
  let setAcolytes: SetAcolytes;
  let ms: MS;
  let acolytes: KaotikaUser[];

  beforeEach(() => {
    setModalData = jest.fn();
    setAcolytes = jest.fn() as jest.Mock<SetAcolytes>;
    ms = jest.fn().mockReturnValue(1);

    acolytes = [
      { ...player, found_artifacts: ['artifact1', 'artifact2', 'artifact3'] },
    ];
  });

  it('should update acolytes when the function is called', () => {
    handlerArtifactCollected(
      ms,
      setModalData,
      setAcolytes,
      player._id,
      '12345665433',
    );

    expect(setAcolytes).toHaveBeenCalled();
  });

  it("shouldn't display modal if fewer that 4 artifacts are collected", () => {
    handlerArtifactCollected(
      ms,
      setModalData,
      setAcolytes,
      player._id,
      '1123432',
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
      player._id,
      'artifact4',
    );

    expect(setAcolytes).toHaveBeenCalledTimes(1);

    expect(setModalData).toHaveBeenCalled();
  });
});
