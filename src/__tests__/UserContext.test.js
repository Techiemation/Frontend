import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { UserContext, UserProvider } from '../UserContext';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Test component to access context
const TestComponent = () => {
  const { user, login, logout } = React.useContext(UserContext);
  
  return (
    <div>
      <div data-testid="user-status">
        {user ? `Logged in as: ${user}` : 'Not logged in'}
      </div>
      <button
        data-testid="login-btn"
        onClick={() => login('testuser@example.com')}
      >
        Login
      </button>
      <button data-testid="logout-btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

describe('UserContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('provides initial user state from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('stored-user@example.com');
    
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    
    expect(screen.getByTestId('user-status')).toHaveTextContent(
      'Logged in as: stored-user@example.com'
    );
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('username');
  });

  test('provides null user state when no localStorage data', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    
    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
  });

  test('login function updates user state and localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    
    // Initially not logged in
    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
    
    // Login
    fireEvent.click(screen.getByTestId('login-btn'));
    
    expect(screen.getByTestId('user-status')).toHaveTextContent(
      'Logged in as: testuser@example.com'
    );
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'username',
      'testuser@example.com'
    );
  });

  test('logout function clears user state and localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('existing-user@example.com');
    
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
    
    // Initially logged in
    expect(screen.getByTestId('user-status')).toHaveTextContent(
      'Logged in as: existing-user@example.com'
    );
    
    // Logout
    fireEvent.click(screen.getByTestId('logout-btn'));
    
    expect(screen.getByTestId('user-status')).toHaveTextContent('Not logged in');
    
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('username');
  });

  test('context provides all required methods', () => {
    const MockConsumer = () => {
      const context = React.useContext(UserContext);
      
      return (
        <div>
          <div data-testid="has-user">{context.user !== undefined ? 'true' : 'false'}</div>
          <div data-testid="has-login">{typeof context.login === 'function' ? 'true' : 'false'}</div>
          <div data-testid="has-logout">{typeof context.logout === 'function' ? 'true' : 'false'}</div>
        </div>
      );
    };
    
    render(
      <UserProvider>
        <MockConsumer />
      </UserProvider>
    );
    
    expect(screen.getByTestId('has-user')).toHaveTextContent('true');
    expect(screen.getByTestId('has-login')).toHaveTextContent('true');
    expect(screen.getByTestId('has-logout')).toHaveTextContent('true');
  });

  test('multiple login calls update state correctly', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    const MultipleLoginComponent = () => {
      const { user, login } = React.useContext(UserContext);
      
      return (
        <div>
          <div data-testid="user-status">{user || 'Not logged in'}</div>
          <button
            data-testid="login-user1"
            onClick={() => login('user1@example.com')}
          >
            Login User 1
          </button>
          <button
            data-testid="login-user2"
            onClick={() => login('user2@example.com')}
          >
            Login User 2
          </button>
        </div>
      );
    };
    
    render(
      <UserProvider>
        <MultipleLoginComponent />
      </UserProvider>
    );
    
    // Login as user1
    fireEvent.click(screen.getByTestId('login-user1'));
    expect(screen.getByTestId('user-status')).toHaveTextContent('user1@example.com');
    
    // Login as user2 (should replace user1)
    fireEvent.click(screen.getByTestId('login-user2'));
    expect(screen.getByTestId('user-status')).toHaveTextContent('user2@example.com');
    
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('username', 'user1@example.com');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('username', 'user2@example.com');
  });
});