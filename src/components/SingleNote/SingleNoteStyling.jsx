import styled from "styled-components";

export const NoteTitleInput= styled.textarea`
  width: 100%;
  background: transparent;
    border: none;
    color: rgba(31,41,55);
    resize: none;
    font-size: 18px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const ActionButton = styled.button`
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
`;


export const PrimaryButton = styled(ActionButton)`
  background-color: #007bff;
  color: #fff;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CloseButtonWrapper = styled.div`
cursor: pointer;
position: absolute;
top: -10px;
right: -10px;
`;



export const CloseButtonIcon = styled.svg`
  width: 20px;
  height: 20px;
  stroke: white;
  background-color: black;
  border-radius: 100%;
  position: absolute;
  top: 0.8rem;
  right: -0.4rem;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease;


`;
export const DragButtonIcon = styled.button`
  display: none;
  border: none;
  background: transparent;
  position: absolute;
  top: 0;
  left: -2px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
 img{
  cursor: grab;
 }
`;
export const MainStyledCard = styled.div`
  display: flex;
 

`;
export const StyledNoteCard = styled.div`
 margin-top: 1rem;
  display: flex;
  gap: 15px;
  /* position: relative; */
  width: 100%;
  max-width: 300px;
  color: #fff;
  padding: 15px;
  min-height: 140px;
  /* flex-direction: column; */
  touch-action: none;
  user-select: none;
  cursor: default;
  transform: translate3d(0, 0, 0);

    &:hover {
    ${CloseButtonWrapper} > ${CloseButtonIcon} {
      opacity: 1;
    }
    ${DragButtonIcon} {
      display: flex;
      opacity: 1;
    }
  }
`;
export const Card = styled.div`
  position: relative;
  min-height: 16rem;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  padding: 1.25rem;
  width: 100%;
  background-color: ${({ background }) => background || 'rgb(255, 188, 0)'};

  .opacity-0 {
    cursor: pointer;
    background-color: black;
    color: white;
    border-radius: 50%;
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    padding: 0.25rem;
    opacity: 0;
  }
 
`;

export const NoteTitle = styled.h4`
  color: rgba(31,41,55);
  font-weight: bold;
  margin-bottom: 0.75rem;
`;
export const NoteText = styled.p`
text-align: justify;
color: rgba(31, 41, 55);
  font-weight: 600;
  font-size: 14px;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;
  display: -webkit-box;
 

`;

export const NoteDate = styled.p`
  color: #4b5563;
  font-size: 0.75rem;
`;

export const IconContainer = styled.div`
  display: flex;
  float: right;
  margin-right: -15px;
`;
export const DateContainer = styled.div`
  display: flex;
  float: left;
  color: black;
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
`;
export const NoteTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  background-color: ${({ foreground }) => foreground};
  color: #000; 
`;
export const Icon = styled.div`
  margin-right: 0.5rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;