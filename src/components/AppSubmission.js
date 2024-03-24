import React, { useState } from 'react';
import styled from 'styled-components';
import { createClient } from '@supabase/supabase-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const supabaseUrl = 'https://mgjxfvvcgxebiqxmvmyx.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  margin-top: 50px; /* Push to the top */
`;

const FormContainer = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 2px solid #1F3251;
  border-radius: 5px;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  width: calc(50% - 2px); /* Adjust width based on space between buttons */
  padding: 10px;
  background-color: #1F3251;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #D64800;
  }
`;

const CancelButton = styled.button`
  width: calc(50% - 2px); /* Adjust width based on space between buttons */
  padding: 10px;
  background-color: #999;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #666;
  }
`;


// Main Function
const AppSubmission = ({ showModal, setShowModal }) => {
  const [appName, setAppName] = useState('');
  const [appURL, setAppURL] = useState('');
  const notify = () => toast("Thanks for submitting!");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Insert the new app data into the Supabase database
      const { error } = await supabase
        .from('new_app_submissions')
        .insert([{ name: appName, url: appURL }]);
      if (error) {
        throw error;
      }
      notify();
      // Clear the input fields after successful submission
      setAppName('');
      setAppURL('');
    } catch (error) {
      console.error('Error adding new app:', error.message);
    }
  };

  const handleCancel = () => {
    // Navigate to home page
    window.location.href = '/';
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <h2>Submit an Application</h2>
        <h4> We will let you know when it is live.</h4>
        <Input
          type="text"
          placeholder="Application Name"
          required
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Application URL"
          required
          value={appURL}
          onChange={(e) => setAppURL(e.target.value)}
        />
        <ButtonGroup>
          <SubmitButton type="submit">Submit</SubmitButton>
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        </ButtonGroup>
        <ToastContainer
          position="top-center"
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
    </Container>
  );
};

export default AppSubmission;
