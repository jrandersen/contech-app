import React from 'react';
import styled from 'styled-components';

const Header = ({ handleSubscribe, handleNewAppButtonClick, setEmail }) => {
  return (
    <HeaderContainer>
      <h1>CONTECH TOOLS</h1>
      <FormContainer onSubmit={handleSubscribe}>
        <EmailInput
          type="email"
          name="EMAIL"
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email..."
        />
        <SubscribeButton type="submit">Subscribe</SubscribeButton>
      </FormContainer>
      <AddNewAppButton onClick={handleNewAppButtonClick}>Submit an App</AddNewAppButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #f5f4f0;
  color: #333;
  padding: 15px;
  z-index: 999;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  margin-right: 5px; /* Add margin-right to create space from the left side of the Add New App button */
  margin-left: auto; /* Push the form container to the right */
`;

const EmailInput = styled.input`
  font-size: 1em;
  margin-right: 5px; /* Add margin-right to create space between the input and button */
  padding: 0.45em 1em;
  border: 2px solid #333;
  border-radius: 3px;
`;

const SubscribeButton = styled.button`
color: #fff;
font-size: 1em;
font-weight: bold;
padding: .5em 1em;
background-color: #333;
border-radius: 8px;
margin-right: 40px;
transition: background-color 0.3s; /* Add transition for smooth effect */

&:hover {
  background-color: #ffef00;
  color: #333; /* Change text color on hover */
}
`;

const AddNewAppButton = styled.button`
  color: #fff;
  font-size: 1em;
  font-weight: bold;
  padding: .5em 1em;
  background-color: #333;
  border-radius: 8px;
  margin-right: 40px;
  transition: background-color 0.3s; /* Add transition for smooth effect */

  &:hover {
    background-color: #ffef00;
    color: #333; /* Change text color on hover */
  }
`;

export default Header;