
import styled from "styled-components";

export const Navbar = styled.nav`
background: #332217;
color: white;
/* background: linear-gradient(90deg, rgba(102,153,255,1) 5%, rgba(80,146,244,1) 14%, rgba(162,57,180,1) 100%); */
`;

export const Brand = styled.a`
display: flex;
gap: 10px;
 color: white;
 font-size: x-large;
 font-weight: 600;
 &:hover {
  color: linear-gradient(90deg, rgba(102,153,255,1) 5%, rgba(80,146,244,1) 14%, rgba(162,57,180,1) 100%);
   
  }
`;

export const ToggleButton = styled.button`
  &.navbar-toggler {
    margin-right: 5rem;
  }
`;

export const SearchForm = styled.form`
  display: flex;
  padding-left: 5rem;
  position: relative;

`;

export const SearchInput = styled.input`
  width: 100%;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  outline: none;
  &:focus {
    border-color: #80bdff;
    box-shadow: 0 0 0 .2rem rgba(0, 123, 255, .25);
  }
  
`;

export const NavbarCollapse = styled.div`
  &.collapse {
    justify-content: center;
  }
`;

export const LogoutImage = styled.img`
cursor: pointer;
width: 45px;
height: 45px;
margin-right: 1rem;
filter: invert(100%);
&:hover {
  opacity: 0.8;
}
`;

export const NavItem = styled.li`
  margin-right: 0.5rem;
  display: flex;
`;

export const SuccessButton = styled.button`
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 2px solid #fff;
  border-radius: 0.25rem;
  color: #d9dad9;
  background-color: transparent;
 margin-left: 10px;

  &:hover {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
  }
`;
export const AddButton = styled.button`

cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
    border-radius: 50%;
    padding: 0.25rem;
    color: white;
    font-weight: bold;
    float: right;
    position: fixed;
  bottom: 20px; 
  right: 20px;
  z-index: 999; 
`;
export const Icon = styled.button`
  position: absolute;
  top: 4px;
  right: 0px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1000;
`;
export const LogoutButton = styled(AddButton)`
background-color: transparent;
  padding: 10px;
`;
