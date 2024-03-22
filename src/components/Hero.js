import React, { useState } from 'react';
import styled from 'styled-components';
import { createClient } from '@supabase/supabase-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const supabaseUrl = 'https://mgjxfvvcgxebiqxmvmyx.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Styled Hero section
const HeroSection = styled.div`
  background-color: #ffffff;
  padding: 20px;
  text-align: center;
  max-width: 980px; /* Limiting the text width */
  margin: 0 auto; /* Center the content horizontally */
  height: 300px; /* Set a fixed height */
  display: flex;
  flex-direction: column; /* Stack elements vertically */
  justify-content: center; /* Center vertically */
  align-items: center;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  padding-bottom: 20px;
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

// Hero component
const Hero = () => {
    const [email, setEmail] = useState('');
    const notify = () => toast("You have been subscribed !");
    
    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
          // Insert the new app data into the Supabase database
          const { data, error } = await supabase
            .from('newsletter_subscribers')
            .insert([{ email: email, source: "contech_tools_website" }]);
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
          notify();
          //alert(`${ email } has been subscribed to the newsletter!`);
        } catch (error) {
          // Clear the email field after an unsuccessful subscription
          setEmail('');
          console.error('Error subscribing:', error.message);
        }
      };

    return (
    <HeroSection>
      <h1 style={{ fontWeight: 'bold' }}>🏗️ Discover Construction Tech Markets and Integration Partners</h1>
      <h3>
        Sign-up for our free weekly newsletter & learn where product managers delve into competition research and uncover integration gems for seamless contech development 💼🔍
      </h3>
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
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          />
      </FormContainer>
    </HeroSection>
  );
};

export default Hero;
