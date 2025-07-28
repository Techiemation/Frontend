import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { UserContext } from '../UserContext';

// Mock Firebase auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({})),
  signOut: jest.fn(() => Promise.resolve())
}));

// Mock react-router-dom's useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

// Mock child components
jest.mock('../components/Logo', () => {
  return function MockLogo() {
    return <div data-testid="logo">Logo</div>;
  };
});

jest.mock('../components/Links', () => {
  return function MockLinks({ user, onSignOut }) {
    return (
      <div data-testid="links">
        <span data-testid="user-status">
          {user ? `User: ${user}` : 'No user'}
        </span>
        {user && (
          <button data-testid="signout-btn" onClick={onSignOut}>
            Sign Out
          </button>
        )}
      </div>
    );
  };
});

jest.mock('../components/Drawer', () => {
  return function MockDrawer({ onMobileNavbar, children }) {
    return (
      <div data-testid="drawer" onClick={onMobileNavbar}>
        {children}
      </div>
    );
  };
});

// Mock react-icons
jest.mock('react-icons/io5', () => ({
  IoMenu: () => <div data-testid="menu-icon">Menu Icon</div>
}));

describe('Navbar Component', () => {
  const renderNavbarWithContext = (userValue = null) => {
    const mockContextValue = {
      user: userValue,
      login: jest.fn(),
      logout: jest.fn()
    };

    return render(
      <BrowserRouter>
        <UserContext.Provider value={mockContextValue}>
          <Navbar onMobileNavbar={jest.fn()} />
        </UserContext.Provider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all main components', () => {
    renderNavbarWithContext();
    
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('links')).toBeInTheDocument();
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  test('has correct CSS class', () => {
    renderNavbarWithContext();
    
    const navbar = document.querySelector('.nav-bar');
    expect(navbar).toBeInTheDocument();
  });

  test('passes user state to Links component when user is logged in', () => {
    renderNavbarWithContext('testuser@example.com');
    
    expect(screen.getByTestId('user-status')).toHaveTextContent('User: testuser@example.com');
    expect(screen.getByTestId('signout-btn')).toBeInTheDocument();
  });

  test('passes no user to Links component when user is not logged in', () => {
    renderNavbarWithContext(null);
    
    expect(screen.getByTestId('user-status')).toHaveTextContent('No user');
    expect(screen.queryByTestId('signout-btn')).not.toBeInTheDocument();
  });

  test('calls onMobileNavbar when drawer is clicked', () => {
    const mockOnMobileNavbar = jest.fn();
    
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ user: null, login: jest.fn(), logout: jest.fn() }}>
          <Navbar onMobileNavbar={mockOnMobileNavbar} />
        </UserContext.Provider>
      </BrowserRouter>
    );
    
    fireEvent.click(screen.getByTestId('drawer'));
    expect(mockOnMobileNavbar).toHaveBeenCalledTimes(1);
  });

  test('handleSignOut function works correctly', async () => {
    const mockLogout = jest.fn();
    const mockContextValue = {
      user: 'testuser@example.com',
      login: jest.fn(),
      logout: mockLogout
    };

    render(
      <BrowserRouter>
        <UserContext.Provider value={mockContextValue}>
          <Navbar onMobileNavbar={jest.fn()} />
        </UserContext.Provider>
      </BrowserRouter>
    );
    
    // Click sign out button
    fireEvent.click(screen.getByTestId('signout-btn'));
    
    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/login-signup');
  });

  test('signOut handles errors gracefully', async () => {
    // Mock Firebase signOut to reject
    const { signOut } = require('firebase/auth');
    signOut.mockImplementation(() => Promise.reject(new Error('Sign out failed')));
    
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    const mockLogout = jest.fn();
    const mockContextValue = {
      user: 'testuser@example.com',
      login: jest.fn(),
      logout: mockLogout
    };

    render(
      <BrowserRouter>
        <UserContext.Provider value={mockContextValue}>
          <Navbar onMobileNavbar={jest.fn()} />
        </UserContext.Provider>
      </BrowserRouter>
    );
    
    // Click sign out button
    fireEvent.click(screen.getByTestId('signout-btn'));
    
    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0));
    
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    
    consoleSpy.mockRestore();
  });

  test('component structure is correct', () => {
    renderNavbarWithContext();
    
    const navbar = document.querySelector('.nav-bar');
    expect(navbar).toContainElement(screen.getByTestId('logo'));
    expect(navbar).toContainElement(screen.getByTestId('links'));
    expect(navbar).toContainElement(screen.getByTestId('drawer'));
  });
});