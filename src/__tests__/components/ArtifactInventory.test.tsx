import { render, screen } from '@testing-library/react-native';
import mockArtifacts from '../../__mocks__/mockArtifacts';
import ArtifactInventory from '../../components/ArtifactInventory';

jest.mock('../../store/useArtifactStore', () => {
  const actualState = jest
    .requireActual<typeof import('../../store/useArtifactStore')>(
      '../../store/useArtifactStore',
    )
    .default.getInitialState();

  return {
    __esModule: true,
    default: jest.fn(getterFn => {
      return getterFn({ ...actualState, artifacts: mockArtifacts });
    }),
  };
});

describe("'ArtifactInventory' component", () => {
  it("should render a number of 'Artifact' components equal to the length of the 'artifacts' array", () => {
    render(<ArtifactInventory />);

    expect(screen.getAllByTestId(/artifact-\d$/)).toHaveLength(
      mockArtifacts.length,
    );
  });
});
