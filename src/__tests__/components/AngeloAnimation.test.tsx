import { act, render } from '@testing-library/react-native';
import AngeloAnimation from '../../components/AngeloAnimation';

jest.mock('../../store/useHallOfSageStore', () => ({
  __esModule: true,
  useHallOfSageStore: jest.fn(),
}));

jest.useFakeTimers();

describe('AngeloAnimation', () => {
  it('should render Angelo Animation component correctly', () => {
    render(<AngeloAnimation />);
  });

  it('should show the words progressively over time', () => {
    const { getByText, queryByText } = render(<AngeloAnimation />);

    expect(queryByText('With')).toBeNull();

    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(getByText('With')).toBeTruthy();
    expect(queryByText('solemn')).toBeNull();

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(getByText('With solemn')).toBeTruthy();
  });
});
