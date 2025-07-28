import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, createMemoryRouter, RouterProvider } from 'react-router-dom';
import { UserContext } from '../UserContext';

/**
 * Test utilities for consistent testing across components
 */

// Default mock user context values
export const mockUserContextLoggedOut = {
  user: null,
  login: jest.fn(),
  logout: jest.fn()
};

export const mockUserContextLoggedIn = {
  user: 'testuser@example.com',
  login: jest.fn(),
  logout: jest.fn()
};

/**
 * Render component with UserContext provider
 * @param {React.Component} component - Component to render
 * @param {Object} contextValue - Custom context value (optional)
 * @returns {Object} - Testing Library render result
 */
export const renderWithUserContext = (component, contextValue = mockUserContextLoggedOut) => {
  return render(
    <UserContext.Provider value={contextValue}>
      {component}
    </UserContext.Provider>
  );
};

/**
 * Render component with Router and UserContext
 * @param {React.Component} component - Component to render
 * @param {Object} contextValue - Custom context value (optional)
 * @returns {Object} - Testing Library render result
 */
export const renderWithRouterAndContext = (component, contextValue = mockUserContextLoggedOut) => {
  return render(
    <BrowserRouter>
      <UserContext.Provider value={contextValue}>
        {component}
      </UserContext.Provider>
    </BrowserRouter>
  );
};

/**
 * Create a memory router for testing specific routes
 * @param {Array} routes - Route configuration array
 * @param {string} initialPath - Initial route path
 * @returns {Router} - Memory router instance
 */
export const createTestRouter = (routes, initialPath = '/') => {
  return createMemoryRouter(routes, {
    initialEntries: [initialPath],
    initialIndex: 0,
  });
};

/**
 * Render component with memory router for route testing
 * @param {React.Component} component - Component to render
 * @param {string} initialPath - Initial route path
 * @returns {Object} - Testing Library render result
 */
export const renderWithMemoryRouter = (component, initialPath = '/') => {
  const router = createMemoryRouter([
    {
      path: '*',
      element: component,
    },
  ], {
    initialEntries: [initialPath],
    initialIndex: 0,
  });

  return render(<RouterProvider router={router} />);
};

/**
 * Mock localStorage for testing user state persistence
 */
export const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

/**
 * Setup localStorage mock
 * @param {Object} initialData - Initial localStorage data
 */
export const setupLocalStorageMock = (initialData = {}) => {
  Object.defineProperty(window, 'localStorage', {
    value: {
      ...mockLocalStorage,
      getItem: jest.fn((key) => initialData[key] || null),
    },
  });
};

/**
 * Common Firebase auth mocks
 */
export const mockFirebaseAuth = {
  getAuth: jest.fn(() => ({})),
  signOut: jest.fn(() => Promise.resolve()),
  signInWithPopup: jest.fn(() => Promise.resolve({ user: { email: 'test@example.com' } })),
  onAuthStateChanged: jest.fn(),
};

/**
 * Setup Firebase mocks
 */
export const setupFirebaseMocks = () => {
  jest.mock('firebase/auth', () => mockFirebaseAuth);
};

/**
 * Common test data for form testing
 */
export const testFormData = {
  validEmail: 'test@example.com',
  invalidEmail: 'invalid-email',
  validPassword: 'password123',
  shortPassword: '123',
  longText: 'This is a long text for testing textarea fields',
  phoneNumber: '+1234567890',
  url: 'https://example.com',
};

/**
 * Mock component factory for consistent component mocking
 * @param {string} testId - Test ID for the mock component
 * @param {string} displayName - Display name for the component
 * @param {Object} props - Props to handle in the mock
 * @returns {Function} - Mock component function
 */
export const createMockComponent = (testId, displayName, props = {}) => {
  const MockComponent = (componentProps) => {
    const propsToDisplay = Object.keys(props).reduce((acc, key) => {
      if (componentProps[key] !== undefined) {
        acc[key] = componentProps[key];
      }
      return acc;
    }, {});

    return (
      <div data-testid={testId} {...propsToDisplay}>
        {displayName}
        {componentProps.children}
      </div>
    );
  };
  
  MockComponent.displayName = displayName;
  return MockComponent;
};

/**
 * Wait for element to appear with custom timeout
 * @param {Function} queryFn - Query function to find element
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise} - Promise that resolves when element is found
 */
export const waitForElement = (queryFn, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    const checkForElement = () => {
      const element = queryFn();
      if (element) {
        resolve(element);
        return;
      }
      
      if (Date.now() - startTime >= timeout) {
        reject(new Error(`Element not found within ${timeout}ms`));
        return;
      }
      
      setTimeout(checkForElement, 100);
    };
    
    checkForElement();
  });
};

/**
 * Common assertions for testing components
 */
export const commonAssertions = {
  /**
   * Assert that a component renders without crashing
   * @param {Object} renderResult - Testing Library render result
   */
  rendersWithoutCrashing: (renderResult) => {
    expect(renderResult.container).toBeInTheDocument();
  },

  /**
   * Assert that required elements are present
   * @param {Function} getByTestId - Testing Library getByTestId function
   * @param {Array} testIds - Array of test IDs to check
   */
  requiredElementsPresent: (getByTestId, testIds) => {
    testIds.forEach(testId => {
      expect(getByTestId(testId)).toBeInTheDocument();
    });
  },

  /**
   * Assert that a form has required accessibility attributes
   * @param {Object} form - Form element
   */
  formAccessibility: (form) => {
    expect(form).toBeInTheDocument();
    // Add more accessibility checks as needed
  },
};

/**
 * Cleanup function to reset all mocks
 */
export const cleanupMocks = () => {
  jest.clearAllMocks();
  jest.resetAllMocks();
};

export default {
  renderWithUserContext,
  renderWithRouterAndContext,
  renderWithMemoryRouter,
  createTestRouter,
  mockLocalStorage,
  setupLocalStorageMock,
  mockFirebaseAuth,
  setupFirebaseMocks,
  testFormData,
  createMockComponent,
  waitForElement,
  commonAssertions,
  cleanupMocks,
};