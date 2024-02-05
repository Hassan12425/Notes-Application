import { useState, useEffect } from "react";
import Nav from "./components/Navbar/Nav";
import ModalDiv from "./components/Modal/Modal";
import { Frown } from "react-feather";
import SingleNote from "./components/SingleNote/SingleNote";
import {  BoxContainer, StyledDiv } from "./Home.styled";
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { AddButton } from "./components/Navbar/Nav.styled";
import FooterButton from "./components/Navbar/FooterButton";



const Home = () => {
  const userId = localStorage.getItem("userId") || "defaultUserId";
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editNoteData, setEditNoteData] = useState(null);

  const handleEditNote = (noteData) => {
    setEditNoteData(noteData); // Set the note data for editing
    setShowModal(true); // Open the modal
  };
  useEffect(() => {
    const allNotes = JSON.parse(localStorage.getItem("myNotes")) || [];
    const userNotes = allNotes.filter((note) => note.userId === userId);
    setData(userNotes);
  }, [userId]);


  const refresher = () => {
    const allNotes = JSON.parse(localStorage.getItem("myNotes")) || [];
    const userNotes = allNotes.filter((note) => note.userId === userId);
    setData(userNotes);
  };
  const [activeId, setActiveId] = useState(null);
  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  const handleDrop = (event) => {
    const { over, active } = event;
    const draggedItemId = active.id;
    const droppedOnItemId = over.id;
    console.log("ACTIVE:", active?.id);
  console.log("OVER:", over?.id);
    const draggedItem = data.find((note) => note.id === draggedItemId);
    const droppedOnItem = data.find((note) => note.id === droppedOnItemId);
  
    const draggedItemIndex = data.indexOf(draggedItem);
    const droppedOnItemIndex = data.indexOf(droppedOnItem);
  
    const newData = [...data];
    newData.splice(droppedOnItemIndex, 0, newData.splice(draggedItemIndex, 1)[0]);
  
    setData(newData);
    localStorage.setItem("myNotes", JSON.stringify(newData));
  };
const handleDragEnd = (event) => {
  handleDrop(event);
};
 
  return (
    <>
    <BoxContainer>
      <Nav
        setShowModal={setShowModal}
        data={data}
        setData={setData}
        refresher={refresher}
      />
      {showModal && (
        <ModalDiv
        showModal={showModal}
        setShowModal={setShowModal}
        refresher={refresher}
        editNoteData={editNoteData}
        />
      )}

      {/* Drag and Drop Context */}
      <DndContext 
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
      >
         <SortableContext
          items={data}
          strategy={verticalListSortingStrategy}
        >
            <StyledDiv >
              {!data.length ? (
                <h1>
                  <Frown size={100} />
                  No Notes. Create a New One
                </h1>
              ) : (
                data.map((item, index) => (
                  <SingleNote
                    key={item.id}
                    item={item}
                    refresher={refresher}
                    index={index}
                    onDrop={handleDrop}
                    setShowModal={setShowModal} 
                  />
                ))
              )}
            </StyledDiv>
            </SortableContext>
      </DndContext>
   
    </BoxContainer>
    <FooterButton setShowModal={setShowModal}/>
    </>
  );
};

export default Home;
