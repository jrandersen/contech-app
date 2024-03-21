import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  top: 0;
  background-color: #f5f4f0;
  color: #333;
  padding: 15px;
  z-index: 1000;
  border-bottom: 1px solid #1F3251; /* Add a border line at the bottom */
`;

const ButtonLink = styled(Link)`
  display: inline-block;
  color: #fff;
  font-size: 1em;
  font-weight: bold;
  padding: .5em 1em;
  background-color: #1F3251;
  border-radius: 8px;
  border: none;
  margin-right: 40px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #D64800;
  }
`;

// Main Function
const Header = ({ app }) => {
 
  return (
    <HeaderContainer>
      <Link to="/">
        <h1> 
          <img src="/contech_tools.png" alt="Logo" width="400" /> 
        </h1>
      </Link>
      <ButtonLink to="/newapp">Submit a Tool</ButtonLink>
    </HeaderContainer>
  );
};

export default Header;