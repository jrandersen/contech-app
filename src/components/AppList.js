import React from 'react';
import Card from './Card';
import styled from 'styled-components';

// Styled component for the container div
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* Align cards in a row */
  gap: 20px; /* Add gap between cards */
`;

const AppList = ({ apps, selectedApp }) => {
  return (
    <CardContainer>
      {apps.map((app) => (
        <Card
          key={app.id}
          app={app}
          selectedApp={selectedApp}
          style={{ flexBasis: 'calc(25% - 20px)' }} // Adjust width
        />
      ))}
    </CardContainer>
  );
};

export default AppList;
