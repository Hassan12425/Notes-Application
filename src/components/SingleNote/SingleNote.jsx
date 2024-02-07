import React, { useState, useEffect } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import DragIcon from "../../images/grip-horizontal.svg";
import { Check } from "react-feather";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CloseButtonIcon,
  CloseButtonWrapper,
  DateContainer,
  DragButtonIcon,
  Icon,
  IconContainer,
  MainStyledCard,
  NoteText,
  NoteTextarea,
  NoteTitle,
  NoteTitleInput,
  PrimaryButton,
  StyledNoteCard,
} from "./SingleNoteStyling";

const SingleNote = ({ item, refresher, onDrop, setShowModal }) => {
  const userId = localStorage.getItem("userId") || "defaultUserId";
  const savedData = JSON.parse(localStorage.getItem("myNotes")) || [];
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(item?.title || "");
  const [content, setContent] = useState(item?.content || "");
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);

  const { attributes: dragAttributes, listeners: dragListeners, setNodeRef: setDragNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    disabled: !dragging,
  });

  const { isOver, setNodeRef: setDropNodeRef } = useDroppable({
    id: `droppable-${item.id}`,
  });

  const dragStyles = {
    transform: transform ? `translate(${transform.x}px, ${0}px)` : "none",
    // opacity: isDragging ? 0.5 : 1,
    border: isDragging ? "2px dashed black" : "",
    willChange: "transform",
  };

  const dropStyles = {
    transition: "transform 0.2s ease, opacity 0.2s ease, scale 0.2s ease",
    transform: isOver ? "scale(1.1)" : "scale(1)",
    opacity:isOver?0.5 : 1,
  };
  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId]);
  
  if (!item) {
    return null; 
  }
  const handleDragIconClick = () => {
    setDragging(true);
  };

  const handleMouseDown = () => {
    if (!dragging) {
      setDragging(true);
    }
  };

  const handleMouseUp = () => {
    if (dragging) {
      setDragging(false);
    }
  };


  const handleDrop = () => {
    onDrop();
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setDragging(false);
    const idx = savedData.findIndex((x) => x.id === item.id);
    savedData[idx].title = title;
    savedData[idx].content = content;
    localStorage.setItem("myNotes", JSON.stringify(savedData));
    setEdit(false);
    // setShowModal(false); 
    refresher();
  };

  const handleDelete = () => {
    const pass = window.confirm("Are you sure you want to delete this note ?");
    if (!pass) {
      return;
    }

    if (savedData.length) {
      const newData = savedData.filter((data) => data.id !== item.id);
      localStorage.setItem("myNotes", JSON.stringify(newData));
      refresher();
    }
  };

  return (
    <MainStyledCard
    data-testid={`note-item-${item.id}`}
      ref={setDropNodeRef}
      onDrop={handleDrop}
      style={dropStyles}
    >

      <StyledNoteCard 
        style={dragStyles}
        ref={setDragNodeRef}
        {...dragAttributes}
        {...dragListeners}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >

        <Card background={item.background} >
          <DragButtonIcon onClick={handleDragIconClick}> <img src={DragIcon} alt="dragicon" /> </DragButtonIcon>
          <CloseButtonWrapper onClick={handleDelete} data-testid="delete-button">
            <CloseButtonIcon xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </CloseButtonIcon>
          </CloseButtonWrapper>
          <div>
            {!edit ? (
              <NoteTitle>{item.title} </NoteTitle>
            ) : (
              <NoteTitleInput
              data-testid="title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                foreground={item.foreground}
              />
            )}
            {!edit ? (
              <NoteText>{item.content}</NoteText>
            ) : (
              <NoteTextarea
              data-testid="content-input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                foreground={item.foreground}
                rows={6}
              />
            )}
          </div>
          <div>
            <DateContainer>{item.date}</DateContainer>
            <IconContainer>
              {!edit ? (
                <Icon onClick={() => setEdit(true)} data-testid="edit-button">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z"></path><path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path><line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line></svg>
                </Icon>
              ) : (
                <PrimaryButton onClick={handleEdit}>
                  <Check />
                </PrimaryButton>
              )}
            </IconContainer>

          </div>
        </Card>
      </StyledNoteCard>

    </MainStyledCard>
  );
};

export default SingleNote;
