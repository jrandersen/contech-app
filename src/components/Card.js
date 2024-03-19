import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

// Styled components for the card
const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const UpdateForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const UpdateInput = styled.input`
  margin-bottom: 5px;
  padding: 5px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
`;

// Card component definition
const Card = ({ app, handleUpdate, handleDelete, handleAppClick }) => {
  // State to manage the updated app details
  const [updatedApp, setUpdatedApp] = useState({ ...app });
  // State to manage whether the update form is visible
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  // Function to handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedApp({ ...updatedApp, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(updatedApp); // Call handleUpdate function with updated app details
    setShowUpdateForm(false); // Hide the update form after submission
  };

  // Function to handle edit button click
  const handleEditClick = (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up
    setShowUpdateForm(true);
  };

  // Function to handle delete button click
  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up
    handleDelete(app.id); // Call handleDelete function with app ID
  };

  return (
    <CardContainer >
      <div onClick={() => handleAppClick(app)}>
        {/* Display app details */}
        <h3>{app.name}</h3>
        <p>Total Votes: {app.votes || 0}</p>
      </div>

      {/* Button container */}
      <ButtonContainer>
        {/* Edit button */}
        <button onClick={handleEditClick}>
          <FontAwesomeIcon icon={faEdit} /> Edit 
        </button>
        {/* Delete button */}
        <button onClick={handleDeleteClick}>
          <FontAwesomeIcon icon={faTrash} /> Delete 
        </button>
      </ButtonContainer>
      {/* Update form */}
      {showUpdateForm && (
        <UpdateForm onSubmit={handleSubmit}>
          <UpdateInput
            type="text"
            name="name"
            value={updatedApp.name}
            onChange={handleChange}
            placeholder="Enter new name"
          />
          <UpdateInput
            type="number"
            name="votes"
            value={updatedApp.votes}
            onChange={handleChange}
            placeholder="Enter new votes"
          />
          <SubmitButton type="submit">Submit</SubmitButton>
        </UpdateForm>
      )}
    </CardContainer>
  );
};

export default Card;
