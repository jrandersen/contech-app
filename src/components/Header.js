import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mgjxfvvcgxebiqxmvmyx.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


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
  border: 2px solid #1F3251;
  border-radius: 3px;
`;

const SubscribeButton = styled.button`
color: #fff;
font-size: 1em;
font-weight: bold;
padding: .5em 1em;
background-color: #1F3251;
border-radius: 8px;
border: none;
margin-right: 40px;
transition: background-color 0.3s; /* Add transition for smooth effect */

&:hover {
  background-color: #D64800;
  color: #1F3251; /* Change text color on hover */
}
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
  const [email, setEmail] = useState('');
  
  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      // Insert the new app data into the Supabase database
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: email, source: "contect_website" }]);
      if (error) {
        throw error;
      }
      // If successful, data may contain the inserted record(s)
      if (data) {
        console.log("Successfully subscribed:", data);
      } else {
        console.log("Subscription successful, no data returned.");
      }
      // Clear the email field after successful subscription
      setEmail('');
      alert(`${ email } has been subscribed to the newsletter!`);
    } catch (error) {
      // Clear the email field after an unsuccessful subscription
      setEmail('');
      console.error('Error subscribing:', error.message);
    }
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <h1> 
          <img src="/contech_tools.png" alt="Logo" width="400" /> 
        </h1>
      </Link>
      <FormContainer onSubmit={handleSubscribe}>
        <EmailInput
          type="email"
          name="EMAIL"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email..."
        />
        <SubscribeButton type="submit">Subscribe</SubscribeButton>
      </FormContainer>
      <ButtonLink to="/newapp">Submit a Tool</ButtonLink>
    </HeaderContainer>
  );
};

export default Header;