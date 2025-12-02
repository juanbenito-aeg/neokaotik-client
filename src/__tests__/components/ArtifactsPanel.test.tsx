import { render, screen } from '@testing-library/react-native';
import ArtifactsPanel from '../../components/ArtifactsPanel';
import React from 'react';

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
});
