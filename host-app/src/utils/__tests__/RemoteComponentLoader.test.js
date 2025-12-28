import React from 'react';
import { render, screen } from '@testing-library/react';
import RemoteComponentLoader from '../RemoteComponentLoader.js';

// Mock для удаленных модулей
jest.mock('dataSelector/DataSelector', () => ({
  default: ({ onChange }) => <div data-testid="data-selector-mock">DataSelector Mock</div>
}));

jest.mock('themeSelector/ThemeSelector', () => ({
  default: ({ onChange }) => <div data-testid="theme-selector-mock">ThemeSelector Mock</div>
}));

describe('RemoteComponentLoader', () => {
  test('renders loading state initially', () => {
    render(<RemoteComponentLoader modulePath="dataSelector/DataSelector" componentName="DataSelector" />);
    
    expect(screen.getByText('Loading DataSelector...')).toBeInTheDocument();
  });

  test('handles unknown module path', () => {
    render(<RemoteComponentLoader modulePath="unknown/Module" componentName="Unknown" />);
    
    expect(screen.getByText('Loading Unknown...')).toBeInTheDocument();
  });
});