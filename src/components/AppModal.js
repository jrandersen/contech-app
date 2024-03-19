import React from 'react';
import styled from 'styled-components';

const AppModal = ({ showModal, selectedApp, handleVote, setShowModal }) => {
  if (!showModal || !selectedApp) {
    return null; // Do not render anything if showModal is false or selectedApp is null
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <ModalContainer>
      <ModalContent>
        <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
        <h2>{selectedApp.name}</h2>
        <img src={selectedApp.company_image} alt={`${selectedApp.name} logo`} />
            <p>
              Website: <a href={selectedApp.url} target="_blank" rel="noopener noreferrer">{selectedApp.url}</a>
            </p>
            <p>Votes: {selectedApp.votes}</p>
            <button onClick={() => handleVote(selectedApp, 1)}>Upvote</button>
            <button onClick={() => handleVote(selectedApp, -1)}>Downvote</button>
      </ModalContent>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: relative;
  background-color: #fefefe;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

export default AppModal;
