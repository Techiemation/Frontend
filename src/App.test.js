import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock UserContext to avoid Firebase dependencies in tests
jest.mock('./UserContext', () => ({
  UserProvider: ({ children }) => <div data-testid="user-provider">{children}</div>,
  UserContext: {
    Provider: ({ children }) => <div data-testid="user-context">{children}</div>
  }
}));

// Mock Firebase to avoid authentication dependencies
jest.mock('./firebase', () => ({
  auth: {},
  db: {},
  googleProvider: {}
}));

describe('App Component', () => {
  test('renders App component without crashing', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Check if the main app div is rendered
    const appElement = screen.getByTestId('user-provider');
    expect(appElement).toBeInTheDocument();
  });

  test('renders app container with correct class', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Check if app div has correct class
    const appDiv = document.querySelector('.app');
    expect(appDiv).toBeInTheDocument();
  });
});