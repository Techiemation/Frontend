# QA Testing Documentation

## Overview
This document outlines the testing infrastructure and procedures for the React frontend application.

## Test Suite Overview

### Current Test Coverage
- **32 tests** across 5 test suites
- **App.test.js**: Basic application rendering and structure
- **Home.test.js**: Homepage component functionality and mobile navigation
- **UserContext.test.js**: Authentication state management
- **Navbar.test.js**: Navigation component and authentication flows
- **Routing.test.js**: Application routing and page navigation

### Test Categories

#### 1. Component Tests
- **Purpose**: Verify individual components render correctly and handle user interactions
- **Files**: App.test.js, Home.test.js, Navbar.test.js
- **Coverage**: Component rendering, user interactions, state management

#### 2. Context Tests  
- **Purpose**: Test authentication state management across the application
- **Files**: UserContext.test.js
- **Coverage**: Login/logout functionality, localStorage integration, state persistence

#### 3. Integration Tests
- **Purpose**: Test component integration and routing behavior
- **Files**: Routing.test.js
- **Coverage**: Page navigation, route parameters, nested routing

## Running Tests

### Basic Test Commands

```bash
# Run all tests
npm test

# Run tests with coverage report
npm test -- --coverage

# Run tests in watch mode (for development)
npm test -- --watch

# Run specific test file
npm test -- --testPathPattern=Home.test.js

# Run tests without watch mode (CI/production)
npm test -- --watchAll=false
```

### Environment Setup

Tests require the Node.js legacy OpenSSL provider due to webpack compatibility:

```bash
NODE_OPTIONS="--openssl-legacy-provider" npm test
```

## Test Structure

### Mocking Strategy
- **Firebase**: Mocked to avoid authentication dependencies in tests
- **React Router**: Uses memory router for testing navigation
- **Child Components**: Mocked to isolate component logic
- **localStorage**: Mocked for testing user state persistence

### Test Utilities
- **React Testing Library**: For component rendering and user interactions
- **Jest**: Test runner and assertion library
- **Mock Functions**: For testing function calls and behaviors

## QA Testing Scenarios

### 1. Authentication Flow Testing
```javascript
// Test user login state persistence
test('user login persists across page reloads', () => {
  // Mock localStorage with user data
  // Render component with UserContext
  // Verify user state is loaded from localStorage
});
```

### 2. Navigation Testing
```javascript
// Test page routing
test('navigation to different pages works correctly', () => {
  // Create memory router with specific route
  // Render application
  // Verify correct page component is displayed
});
```

### 3. Component Interaction Testing
```javascript
// Test mobile navigation toggle
test('mobile menu opens and closes correctly', () => {
  // Render component
  // Click mobile menu trigger
  // Verify menu state changes
});
```

## Test Data Patterns

### User Authentication States
```javascript
// Logged in user
const loggedInUser = 'testuser@example.com';

// No user (logged out)
const loggedOutUser = null;

// User context mock
const mockUserContext = {
  user: loggedInUser,
  login: jest.fn(),
  logout: jest.fn()
};
```

### Route Testing
```javascript
// Test different application routes
const routes = [
  '/',                 // Home
  '/prompt',          // Prompt page
  '/plan',            // Basic plan
  '/plan+',           // Premium plan
  '/login-signup',    // Login
  '/login-signup+',   // Signup
  '/about-us',        // About
  '/contact-us',      // Contact
  '/userProfile'      // User profile
];
```

## Test Maintenance

### Adding New Tests
1. Create test file in `src/__tests__/` directory
2. Import necessary testing utilities
3. Mock external dependencies (Firebase, router, etc.)
4. Write descriptive test cases with clear assertions
5. Update this documentation with new test categories

### Test File Naming Convention
- Component tests: `ComponentName.test.js`
- Page tests: `PageName.test.js`
- Utility tests: `utilityName.test.js`
- Integration tests: `FeatureName.test.js`

### Best Practices
- Mock external dependencies to isolate component logic
- Use descriptive test names that explain the expected behavior
- Test both success and error scenarios
- Include accessibility testing where applicable
- Maintain test data consistency across test files

## Continuous Integration

### CI Test Command
```bash
NODE_OPTIONS="--openssl-legacy-provider" npm test -- --watchAll=false --coverage --passWithNoTests
```

### Coverage Thresholds
- **Statements**: Aim for >80% coverage
- **Branches**: Aim for >70% coverage  
- **Functions**: Aim for >80% coverage
- **Lines**: Aim for >80% coverage

## Troubleshooting

### Common Issues

1. **Node.js OpenSSL Error**
   - Solution: Use `NODE_OPTIONS="--openssl-legacy-provider"`
   - Cause: Webpack compatibility with newer Node.js versions

2. **React Import Errors**
   - Solution: Ensure `import React from 'react'` in component files
   - Cause: JSX requires React in scope

3. **Mock Not Working**
   - Solution: Verify mock is declared before component import
   - Cause: Jest hoisting behavior with ES6 modules

4. **Test Timeout**
   - Solution: Increase timeout or remove unnecessary async operations
   - Cause: Slow test execution or infinite loops

## Additional Resources

- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing React Components Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)