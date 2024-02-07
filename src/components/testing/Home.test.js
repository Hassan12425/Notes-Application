import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../Home';
import SingleNote from '../SingleNote/SingleNote';

describe('Home Component', () => {
  const mockOnDrop = jest.fn();
  it('Check Home Component render Correctly when No Notes Are There ', () => {
    render(<Home/>)
    expect(screen.getByText('My Notes App')).toBeInTheDocument();
    expect(screen.getByText('No Notes. Create a New One')).toBeInTheDocument();
    
  });
  it("opens modal when 'Add' button is clicked", () => {
    render(<Home />);
    const addButton = screen.getByTestId("add-button"); 
    fireEvent.click(addButton);
    expect(screen.getByText("Add New Note")).toBeInTheDocument(); 
  });

  it("maps notes correctly on Home screen", () => {
    const mockNotes = [
      { id: 1, title: "Note 1", content: "Content 1" },
      { id: 2, title: "Note 2", content: "Content 2" },
    ];
    localStorage.setItem("myNotes", JSON.stringify(mockNotes));

    render(<Home />);
    mockNotes.map((note, index) => {
      <SingleNote
      item={mockNotes}
      index={index}
      key={note.id}
      onDrop={mockOnDrop}
    />
    });
  });
})
