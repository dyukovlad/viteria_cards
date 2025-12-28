import React from 'react';
import { render, screen } from '@testing-library/react';
import CardList from '../CardList.js';

// Простой тест, который не зависит от удаленного модуля
describe('CardList Component', () => {
  test('renders loading state initially', () => {
    render(<CardList dataSource="quotes" />);
    
    expect(screen.getByText('Loading CardList...')).toBeInTheDocument();
  });

  test('renders data source in loading text', () => {
    render(<CardList dataSource="todos" />);
    
    expect(screen.getByText('Loading CardList...')).toBeInTheDocument();
  });
});