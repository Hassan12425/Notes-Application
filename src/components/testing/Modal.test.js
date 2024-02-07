import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ModalDiv from "../Modal/Modal";

describe("ModalDiv component", () => {
  const mockShowModal = true;
  const mockSetShowModal = jest.fn();
  const mockRefresher = jest.fn();
  const mockEditNoteData = {
    id: "1",
    title: "Test Note",
    content: "Test Content",
    background: "rgb(255, 188, 0)",
    foreground: "rgb(236, 198, 91)",
  };
  it("renders ModalDiv component correctly", () => {
    render(
      <ModalDiv
        showModal={mockShowModal}
        setShowModal={mockSetShowModal}
        refresher={mockRefresher}
        editNoteData={null}
      />
    );

    expect(screen.getByText("Add New Note")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter notes...")).toBeInTheDocument();
    expect(screen.getByText("Select Theme")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("handles input changes correctly", () => {
    render(
      <ModalDiv
        showModal={mockShowModal}
        setShowModal={mockSetShowModal}
        refresher={mockRefresher}
        editNoteData={null}
      />
    );

    const titleInput = screen.getByPlaceholderText("Enter title");
    const contentTextarea = screen.getByPlaceholderText("Enter notes...");

    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(contentTextarea, { target: { value: "New Content" } });

    expect(titleInput.value).toBe("New Title");
    expect(contentTextarea.value).toBe("New Content");
  });

  it("handles theme color selection correctly", () => {
    render(
      <ModalDiv
        showModal={mockShowModal}
        setShowModal={mockSetShowModal}
        refresher={mockRefresher}
        editNoteData={null}
      />
    );

    const selectThemeButton = screen.getByText("Select Theme");
    fireEvent.click(selectThemeButton);
  });

  it("handles adding a new note correctly", () => {
    render(
      <ModalDiv
        showModal={mockShowModal}
        setShowModal={mockSetShowModal}
        refresher={mockRefresher}
        editNoteData={null}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter title"), {
      target: { value: "New Title" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter notes..."), {
      target: { value: "New Content" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    const savedData = JSON.parse(localStorage.getItem("myNotes"));
    expect(savedData).toHaveLength(1);
    expect(savedData[0].title).toBe("New Title");
    expect(savedData[0].content).toBe("New Content");
  });

  it("handles canceling correctly", () => {
    render(
      <ModalDiv
        showModal={mockShowModal}
        setShowModal={mockSetShowModal}
        refresher={mockRefresher}
        editNoteData={null}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter title"), {
      target: { value: "New Title" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter notes..."), {
      target: { value: "New Content" },
    });

    fireEvent.click(screen.getByText("Cancel"));

    const titleInput = screen.getByPlaceholderText("Enter title");
    const contentTextarea = screen.getByPlaceholderText("Enter notes...");
    expect(titleInput.value).toBe("");
    expect(contentTextarea.value).toBe("");
  });


  it("closes modal when clicked outside", () => {
    const { getByTestId } = render(
      <ModalDiv
        showModal={mockShowModal}
        setShowModal={mockSetShowModal}
        refresher={mockRefresher}
        editNoteData={mockEditNoteData}
      />
    );
    
    fireEvent.click(getByTestId("outside-container"));
    expect(mockSetShowModal).toHaveBeenCalledWith(false);
  });
  

});
