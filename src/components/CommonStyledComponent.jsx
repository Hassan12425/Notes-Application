import styled from "styled-components";
import image from "../images/bg.jpg"

export const BoxContainer = styled.div`
background-image:url(${image});
background-size: cover;
background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled.form`
  width: 100%;
  max-width: 450px;
  padding: 1.3rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0px 0px 30px whitesmoke;
  backdrop-filter: blur(10px);
  h1{
    font-size:28px;
    font-weight: 700;
  }
`;

export const Input = styled.input`
  width: 100%;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 15px 10px;
  font-size: 12px;

  &:focus {
    border-bottom: 2px solid rgb(241, 196, 15);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  background-color: rgb(241, 196, 15);
`;
export const MutedLink = styled.a`
  font-size: 14px;
  color: whitesmoke;
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 14px;
  color: rgb(56, 52, 34);
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;