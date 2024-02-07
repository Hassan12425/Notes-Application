// Nav.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Nav from '../Navbar/Nav';

describe('Nav component', () => {
  const mockData = [
    { id: 1, title: "Note 1", content: "Content 1" },
    { id: 2, title: "Note 2", content: "Content 2" },
  ];
  const mockSetData = jest.fn();
  const mockRefresher = jest.fn();

  it('renders Nav component correctly', () => {
    render(<Nav data={mockData} setData={() => {}} refresher={() => {}} />);
    
    expect(screen.getByText('My Notes App')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByAltText('Logout')).toBeInTheDocument();
  });



  it("filters data correctly based on search input", () => {
    const { getByPlaceholderText } = render(
      <Nav data={mockData} setData={mockSetData} refresher={mockRefresher} />
    );

    const searchInput = getByPlaceholderText("Search");

    fireEvent.change(searchInput, { target: { value: "Note 1" } });

    // Expect setData to be called with the filtered data
    expect(mockSetData).toHaveBeenCalledWith([{ id: 1, title: "Note 1", content: "Content 1" }]);
    fireEvent.change(searchInput, { target: { value: "" } });
    expect(mockRefresher).toHaveBeenCalled();
  });

  it("renders correctly when search input does not match any data", () => {
    const { getByPlaceholderText, queryByText } = render(
      <Nav data={mockData} setData={mockSetData} refresher={mockRefresher} />
    );

    const searchInput = getByPlaceholderText("Search");
    fireEvent.change(searchInput, { target: { value: "Nodata" } });

    // Expect no data  based on the search input
    expect(queryByText("Note 1")).toBeNull();
    expect(queryByText("Note 2")).toBeNull();
  });

});
