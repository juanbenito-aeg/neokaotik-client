import React from 'react';
import ArtifactsPanel from '../../components/ArtifactsPanel';
import { fireEvent, render, screen } from '@testing-library/react-native';
import emitArtifactsSearchValidationOrReset from '../../socket/events/artifacts-search-validation-reset';

jest.mock('../../socket/events/artifacts-search-validation-reset');

beforeEach(() => {
  jest.clearAllMocks();
});

jest.spyOn(React, 'useState').mockImplementation(() => [true, jest.fn()]);

describe('Artifacts Panel', () => {
  it('should render Artifacts Panel container', () => {
    render(<ArtifactsPanel />);

    expect(screen.getByTestId('artifacts-panel')).toBeTruthy();
  });

  it('should show buttons after animation finishes', () => {
    render(<ArtifactsPanel />);

    const buttons = screen.getByTestId('button-container');
    expect(buttons).toBeTruthy();
  });

  it('should trigger a validate when clicking (Validate search) button', () => {
    render(<ArtifactsPanel />);

    const validateButton = screen.getByText(/Validate search/);

    fireEvent.press(validateButton);

    expect(emitArtifactsSearchValidationOrReset).toHaveBeenCalledWith(true);
  });

  it('should trigger a reset when clicking (Reset search) button', () => {
    render(<ArtifactsPanel />);

    const resetButton = screen.getByText(/Reset search/);

    fireEvent.press(resetButton);

    expect(emitArtifactsSearchValidationOrReset).toHaveBeenCalledWith(false);
  });
});
