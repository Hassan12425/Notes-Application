import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Brand, Navbar, NavbarCollapse, SearchForm, SearchInput, ToggleButton, LogoutImage, Icon } from "./Nav.styled";
import logoutImage from "../../images/logout.svg";
import { Search } from "react-feather";

const Nav = ({  data, setData, refresher }) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };



  return (
    <Navbar className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <Brand className="navbar-brand">
          My Notes App
        </Brand>
     
        <SearchForm>
          <SearchInput
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchValue}
            
          />
          <Icon>
            <Search/>
          </Icon>
        </SearchForm>
        <NavbarCollapse id="navbarSupportedContent">
          <LogoutImage src={logoutImage} alt="Logout" onClick={handleLogout} />
        </NavbarCollapse>
      </div>
    </Navbar>
  );
};

export default Nav;
