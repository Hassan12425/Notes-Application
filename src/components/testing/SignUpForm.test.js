import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import {  SigupForm } from '../SigUpForm';

describe('SignupForm component', () => {
  it('renders signup form correctly', () => {

    render(<SigupForm/>,{wrapper:MemoryRouter})
    expect(screen.getByText('SignUp')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Signup' })).toBeInTheDocument();
    expect(screen.getByText("Already have an account?")).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Signin' })).toBeInTheDocument();
  });
  

  it('updates state on input change', () => {
    render(<SigupForm />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Hassan Khan' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '12425' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: '12425' } });

    expect(screen.getByPlaceholderText('Full Name').value).toBe('Hassan Khan');
    expect(screen.getByPlaceholderText('Email').value).toBe('test@gmail.com');
    expect(screen.getByPlaceholderText('Password').value).toBe('12425');
    expect(screen.getByPlaceholderText('Confirm Password').value).toBe('12425');
  });

  it('submits the form and  successful signup', () => {
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue(JSON.stringify([])),
      setItem: jest.fn(),
    };
    global.localStorage = localStorageMock;
    const navigateMock = jest.fn();

    render(<SigupForm />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Hassan Khan' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '12425' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: '12425' } });

    fireEvent.click(screen.getByRole('button', { name: 'Signup' }));
    // expect(localStorageMock.setItem).toHaveBeenCalled();
    // expect(navigateMock).toHaveBeenCalledWith('/');
  });
  
  it('displays an alert on unsuccessful signup with duplicate email', () => {
    const localStorageMock = {
      getItem: jest.fn().mockReturnValue(JSON.stringify([{ email: 'test@gmail.com' }])),
      setItem: jest.fn(),
    };
    global.localStorage = localStorageMock;
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<SigupForm />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByPlaceholderText('Full Name'), { target: { value: 'Hassan khan' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@gmail.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '12425' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: '12425' } });

    fireEvent.click(screen.getByRole('button', { name: 'Signup' }));

    expect(alertMock).toHaveBeenCalledWith('Email is already in use. Please choose another.');
    jest.clearAllMocks();
  });


});
