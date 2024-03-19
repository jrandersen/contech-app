import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 CONTECH TOOLS.FYI | For more information, contact me <a href="https://www.linkedin.com/in/jason--andersen/">here</a></p>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f5f4f0;
  color: #333;
  padding: 10px 0;
  text-align: center;
  z-index: 999;
`;


export default Footer;
