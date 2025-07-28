import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

// Mock all the components used in Home
jest.mock('../components/Hero', () => {
  return function MockHero() {
    return <div data-testid="hero">Hero Component</div>;
  };
});

jest.mock('../components/Features', () => {
  return function MockFeatures() {
    return <div data-testid="features">Features Component</div>;
  };
});

jest.mock('../components/Quote', () => {
  return function MockQuote() {
    return <div data-testid="quote">Quote Component</div>;
  };
});

jest.mock('../components/Navbar', () => {
  return function MockNavBar({ onMobileNavbar }) {
    return (
      <nav data-testid="navbar">
        <button onClick={onMobileNavbar} data-testid="mobile-menu-trigger">
          Menu
        </button>
      </nav>
    );
  };
});

jest.mock('../components/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer Component</footer>;
  };
});

jest.mock('../components/MobileNavbar', () => {
  return function MockMobileNavbar({ mobileNavbar, onMobileNavbar }) {
    return (
      <div 
        data-testid="mobile-navbar" 
        data-visible={mobileNavbar}
        onClick={onMobileNavbar}
      >
        Mobile Navbar
      </div>
    );
  };
});

describe('Home Page', () => {
  const renderHome = () => {
    return render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  };

  test('renders all main sections', () => {
    renderHome();
    
    // Check if all main components are rendered
    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('mobile-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('features')).toBeInTheDocument();
    expect(screen.getByTestId('quote')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  test('mobile navbar is initially hidden', () => {
    renderHome();
    
    const mobileNavbar = screen.getByTestId('mobile-navbar');
    expect(mobileNavbar).toHaveAttribute('data-visible', 'false');
  });

  test('mobile navbar toggle functionality works', () => {
    renderHome();
    
    const mobileMenuTrigger = screen.getByTestId('mobile-menu-trigger');
    const mobileNavbar = screen.getByTestId('mobile-navbar');
    
    // Initially hidden
    expect(mobileNavbar).toHaveAttribute('data-visible', 'false');
    
    // Click to show
    fireEvent.click(mobileMenuTrigger);
    expect(mobileNavbar).toHaveAttribute('data-visible', 'true');
    
    // Click to hide
    fireEvent.click(mobileMenuTrigger);
    expect(mobileNavbar).toHaveAttribute('data-visible', 'false');
  });

  test('mobile navbar can be closed by clicking on it', () => {
    renderHome();
    
    const mobileMenuTrigger = screen.getByTestId('mobile-menu-trigger');
    const mobileNavbar = screen.getByTestId('mobile-navbar');
    
    // Open mobile navbar
    fireEvent.click(mobileMenuTrigger);
    expect(mobileNavbar).toHaveAttribute('data-visible', 'true');
    
    // Close by clicking on mobile navbar
    fireEvent.click(mobileNavbar);
    expect(mobileNavbar).toHaveAttribute('data-visible', 'false');
  });

  test('has correct HTML structure', () => {
    renderHome();
    
    // Check for main element
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();
    
    // Check that main contains the expected components
    expect(mainElement).toContainElement(screen.getByTestId('hero'));
    expect(mainElement).toContainElement(screen.getByTestId('features'));
    expect(mainElement).toContainElement(screen.getByTestId('quote'));
  });
});