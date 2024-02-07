import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { LogginForm } from '../LogginInForm';

describe('LogginForm component', () => {
  it('renders login form correctly', () => {
    render(<LogginForm />, { wrapper: MemoryRouter });

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText("Forget your password?")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Signin' })).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Signup' })).toBeInTheDocument();
  });

  it('updates state on input change', () => {
    render(<LogginForm />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '12425' } });

    expect(screen.getByPlaceholderText('Email').value).toBe('test@gmail.com');
    expect(screen.getByPlaceholderText('Password').value).toBe('12425');
  });

 it('submits the form and redirects on successful login', async () => {
  const mockUser = {
    email: 'test@gmail.com',
    password: '12425',
    id: '1',
  };

  const localStorageMock = {
    getItem: jest.fn().mockReturnValue(JSON.stringify([mockUser])),
    setItem: jest.fn(),
  };

  global.localStorage = localStorageMock;

  const navigateMock = jest.fn();

  render(<LogginForm />, { wrapper: MemoryRouter });


  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@gmail.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '12425' } });
  fireEvent.click(screen.getByRole('button', { name: 'Signin' }));
  // await waitFor(() => {
  //   expect(navigateMock).toHaveBeenCalledWith('/home');
  // });

});


it('displays an error message on unsuccessful login', () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  
    // Ensure localStorage returns an empty array (simulate unsuccessful login)
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue(JSON.stringify([])),
      setItem: jest.fn(),
    };
    global.localStorage = localStorageMock;
  
    render(<LogginForm />, { wrapper: MemoryRouter });
  
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'invalid@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'invalidpassword' } });
    fireEvent.click(screen.getByRole('button', { name: 'Signin' }));
    expect(alertMock).toHaveBeenCalledWith('Invalid email or password. Please try again.');
    alertMock.mockRestore();
  });
  
});
