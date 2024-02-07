import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import userEvent from "@testing-library/user-event";
import SingleNote from "../SingleNote/SingleNote";

describe("SingleNote component", () => {
  const mockNote = {
    id: "1",
    title: "Hassan khan",
    content: "Test Content",
    background: "#ffffff",
    foreground: "#000000",
    date: "01-30-2024",
  };
  const mockRefresher = jest.fn();
  const mockOnDrop = jest.fn();
  it("renders SingleNote component correctly with DndContex", () => {
    render(
      <MemoryRouter>
        <DndContext collisionDetection={closestCenter} onDragEnd={mockOnDrop}>
          <SortableContext
            items={[mockNote]}
            strategy={verticalListSortingStrategy}
          >
            <SingleNote
              item={mockNote}
              refresher={mockRefresher}
              index={0}
              onDrop={mockOnDrop}
              setShowModal={jest.fn()}
            />
          </SortableContext>
        </DndContext>
      </MemoryRouter>
    );

    expect(screen.getByText("Hassan khan")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    expect(screen.getByText("01-30-2024")).toBeInTheDocument();
  });

  it("allows dragging and dropping SingleNote component", () => {
    const { container } = render(
      <MemoryRouter>
        <DndContext collisionDetection={closestCenter} onDragEnd={mockOnDrop}>
          <SortableContext
            items={[mockNote]}
            strategy={verticalListSortingStrategy}
          >
            <SingleNote
              item={mockNote}
              refresher={mockRefresher}
              index={0}
              onDrop={mockOnDrop}
              setShowModal={jest.fn()}
            />
          </SortableContext>
        </DndContext>
      </MemoryRouter>
    );

    // drag-and-drop
    const noteElement = container.querySelector('[draggable="true"]');
  });

  it('handles delete correctly', () => {
    window.confirm = jest.fn(() => true);
  
    render(
      <MemoryRouter>
        <DndContext>
          <SingleNote
            item={mockNote}
            refresher={mockRefresher}
            index={0}
            onDrop={mockOnDrop}
            setShowModal={jest.fn()}
          />
        </DndContext>
      </MemoryRouter>
    );
  
    const deleteButton = screen.getByTestId('delete-button');
    userEvent.click(deleteButton);
    expect(window.confirm).toHaveBeenCalledWith('Are you sure you want to delete this note ?');
  });

  it("handle edit correctly", () => {
    render(
      <MemoryRouter>
        <DndContext>
          <SingleNote
            item={mockNote}
            refresher={mockRefresher}
            index={0}
            onDrop={mockOnDrop}
            setShowModal={jest.fn()}
          />
        </DndContext>
      </MemoryRouter>
    );

    const editButton = screen.getByTestId("edit-button");
    fireEvent.click(editButton);

    const titleInput = screen.getByTestId("title-input");
    const contentInput = screen.getByTestId("content-input");
  
    expect(titleInput).toBeInTheDocument();
    expect(contentInput).toBeInTheDocument();
    
    expect(titleInput.value).toBe("Hassan khan");
    expect(contentInput.value).toBe("Test Content");
  });
});
