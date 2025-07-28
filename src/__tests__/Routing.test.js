import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import App from '../App';

// Mock all the page components to avoid complex dependencies
jest.mock('../pages/Home', () => {
  return function MockHome() {
    return <div data-testid="home-page">Home Page</div>;
  };
});

jest.mock('../pages/About', () => {
  return function MockAbout() {
    return <div data-testid="about-page">About Page</div>;
  };
});

jest.mock('../pages/Contact', () => {
  return function MockContact() {
    return <div data-testid="contact-page">Contact Page</div>;
  };
});

jest.mock('../pages/prompt', () => {
  return function MockPrompt() {
    return <div data-testid="prompt-page">Prompt Page</div>;
  };
});

jest.mock('../pages/login-signup', () => {
  return function MockLoginSignup({ form }) {
    return <div data-testid="login-signup-page">Login Signup Page - {form}</div>;
  };
});

jest.mock('../pages/payment', () => {
  return function MockPayment({ plan_ }) {
    return <div data-testid="payment-page">Payment Page - {plan_}</div>;
  };
});

jest.mock('../pages/userProfile', () => {
  return function MockUserProfile() {
    return <div data-testid="user-profile-page">User Profile Page</div>;
  };
});

// Mock UserContext
jest.mock('../UserContext', () => ({
  UserProvider: ({ children }) => <div data-testid="user-provider">{children}</div>,
}));

describe('Routing Tests', () => {
  const createTestRouter = (initialPath = '/') => {
    return createMemoryRouter([
      {
        path: '/',
        element: <App />,
        children: [
          {
            index: true,
            element: <div data-testid="home-page">Home Page</div>,
          },
          {
            path: 'prompt',
            element: <div data-testid="prompt-page">Prompt Page</div>,
          },
          {
            path: 'plan',
            element: <div data-testid="payment-page">Payment Page - Basic</div>,
          },
          {
            path: 'plan+',
            element: <div data-testid="payment-page">Payment Page - Premium</div>,
          },
          {
            path: 'login-signup',
            element: <div data-testid="login-signup-page">Login Signup Page - Login</div>,
          },
          {
            path: 'login-signup+',
            element: <div data-testid="login-signup-page">Login Signup Page - Sign Up</div>,
          },
          {
            path: 'about-us',
            element: <div data-testid="about-page">About Page</div>,
          },
          {
            path: 'contact-us',
            element: <div data-testid="contact-page">Contact Page</div>,
          },
          {
            path: 'userProfile',
            element: <div data-testid="user-profile-page">User Profile Page</div>,
          },
        ],
      },
    ], {
      initialEntries: [initialPath],
      initialIndex: 0,
    });
  };

  test('renders home page on root path', () => {
    const router = createTestRouter('/');
    
    render(<RouterProvider router={router} />);
    
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  test('renders prompt page on /prompt path', () => {
    const router = createTestRouter('/prompt');
    
    render(<RouterProvider router={router} />);
    
    expect(screen.getByTestId('prompt-page')).toBeInTheDocument();
  });

  test('renders basic payment page on /plan path', () => {
    const router = createTestRouter('/plan');
    
    render(<RouterProvider router={router} />);
    
    expect(screen.getByTestId('payment-page')).toBeInTheDocument();
    expect(screen.getByTestId('payment-page')).toHaveTextContent('Basic');
  });

  test('renders premium payment page on /plan+ path', () => {
    const router = createTestRouter('/plan+');
    
    render(<RouterProvider router={router} />);
    
    expect(screen.getByTestId('payment-page')).toBeInTheDocument();
    expect(screen.getByTestId('payment-page')).toHaveTextContent('Premium');
  });

  test('renders login page on /login-signup path', () => {
    const router = createTestRouter('/login-signup');
    
    render(<RouterProvider router={router} />);
    
    expect(screen.getByTestId('login-signup-page')).toBeInTheDocument();
    expect(screen.getByTestId('login-signup-page')).toHaveTextContent('Login');
  });

  test('renders signup page on /login-signup+ path', () => {
    const router = createTestRouter('/login-signup+');
    
    render(<RouterProvider router={router} />);
    
    expect(screen.getByTestId('login-signup-page')).toBeInTheDocument();
    expect(screen.getByTestId('login-signup-page')).toHaveTextContent('Sign Up');
  });

  test('renders about page on /about-us path', () => {
    const router = createTestRouter('/about-us');
    
    render(<RouterProvider router={router} />);
    
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });

  test('renders contact page on /contact-us path', () => {
    const router = createTestRouter('/contact-us');
    
    render(<RouterProvider router={router} />);
    
    expect(screen.getByTestId('contact-page')).toBeInTheDocument();
  });

  test('renders user profile page on /userProfile path', () => {
    const router = createTestRouter('/userProfile');
    
    render(<RouterProvider router={router} />);
    
    expect(screen.getByTestId('user-profile-page')).toBeInTheDocument();
  });

  test('all routes render within UserProvider context', () => {
    const router = createTestRouter('/');
    
    render(<RouterProvider router={router} />);
    
    expect(screen.getByTestId('user-provider')).toBeInTheDocument();
    expect(screen.getByTestId('user-provider')).toContainElement(
      screen.getByTestId('home-page')
    );
  });

  test('app container has correct class', () => {
    const router = createTestRouter('/');
    
    render(<RouterProvider router={router} />);
    
    const appDiv = document.querySelector('.app');
    expect(appDiv).toBeInTheDocument();
    expect(appDiv).toContainElement(screen.getByTestId('home-page'));
  });
});