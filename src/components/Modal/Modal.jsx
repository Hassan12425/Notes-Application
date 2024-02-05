import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Plus } from "react-feather";
import { Circle, CircleContainer } from "./Modalstyle";

function ModalDiv({ showModal, setShowModal, refresher, editNoteData }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [background, setBackground] = useState("rgb(255, 188, 0);");
  const [foreground, setForeground] = useState("rgb(236, 198, 91);");

  useEffect(() => {
    // Populate the fields with existing note data if editing
    if (editNoteData) {
      setTitle(editNoteData.title);
      setContent(editNoteData.content);
      setBackground(editNoteData.background);
      setForeground(editNoteData.foreground);
    }
  }, [editNoteData]);

  const handleAddOrEdit = () => {
    const userId = localStorage.getItem("userId") || "defaultUserId";
    const savedData = JSON.parse(localStorage.getItem("myNotes")) || [];

    // If editNoteData exists, it means editing an existing note; otherwise, it's a new note
    if (editNoteData) {
      // Find the edited note and update its data
      const editedNoteIndex = savedData.findIndex((note) => note.id === editNoteData.id);
      if (editedNoteIndex !== -1) {
        savedData[editedNoteIndex] = {
          ...savedData[editedNoteIndex],
          title,
          content,
          background,
          foreground,
        };
      }
    } else {
      // Add a new note if editNoteData is not available
      if (!title || !content) {
        return alert("Title and Content are required");
      }

      const newNote = {
        id: Date.now(),
        userId,
        title,
        content,
        background,
        foreground,
        date: new Date().toLocaleDateString(),
      };
      savedData.push(newNote);
    }

    localStorage.setItem("myNotes", JSON.stringify(savedData));
    setTitle("");
    setContent("");
    setShowModal(false);
    refresher();
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setShowModal(false);
  };

  const handleColor = (bg, fg) => {
    setBackground(bg);
    setForeground(fg);
  };

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)} data-testid="modal">
        <Modal.Header closeButton>
        <Modal.Title>{editNoteData ? "Edit Note" : "Add New Note"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control mb-3"
            placeholder="Enter title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            className="form-control mb-3"
            style={{ height: "180px" }}
            placeholder="Enter notes..."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          
          {/* for color selection */}
          <DropdownButton id="dropdown-basic-button" title="Select Theme">
            <Dropdown.Item href="">
              <CircleContainer
                onClick={() => handleColor("#54BAB9", "#9ED2C6")}
              >
                <Circle
                  style={{ backgroundColor: "#54BAB9" }}
                ></Circle>

                <Circle
                  style={{ backgroundColor: "#9ED2C6" }}
                ></Circle>
              </CircleContainer>
            </Dropdown.Item>
            <Dropdown.Item href="">
              {" "}
              <CircleContainer
                onClick={() => handleColor("#FFE898", "#FFF8BC")}
              >
                <Circle
                 
                  style={{ backgroundColor: "#FFE898" }}
                ></Circle>
                <Circle
                  style={{ backgroundColor: "#FFF8BC" }}
                ></Circle>
              </CircleContainer>
            </Dropdown.Item>
            <Dropdown.Item
              href=""
              onClick={() => handleColor("rgb(103, 236, 107)", "rgb(136, 236, 140)")}
            >
              {" "}
              <CircleContainer>
                <Circle
                  style={{ backgroundColor: "rgb(103, 236, 107)" }}
                ></Circle>
                <Circle
                  style={{ backgroundColor: "rgb(136, 236, 140)" }}
                ></Circle>
              </CircleContainer>
            </Dropdown.Item>
            <Dropdown.Item href="">
              {" "}
              <CircleContainer
                onClick={() => handleColor("rgb(214, 144, 60)", "rgb(245, 182, 105)")}
              >
                <Circle
                  style={{ backgroundColor: "rgb(214, 144, 60)" }}
                ></Circle>
                <Circle
                  style={{ backgroundColor: "rgb(245, 182, 105)" }}
                ></Circle>
                Default
              </CircleContainer>
            </Dropdown.Item>
          </DropdownButton>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddOrEdit} data-testid="add-note-button">
            <Plus /> {editNoteData ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDiv;