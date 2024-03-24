import React, { useState } from 'react';
import Card from './Card';
import styled from 'styled-components';

// Styled component for the container div
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Align cards in a row */
  gap: 30px; /* Add gap between cards */
`;

const Input = styled.input`
  display: block;
  width: 450px;
  margin-bottom: 20px;
  margin-top: 10px;
  padding: 10px;
  border: 2px solid #1F3251;
  border-radius: 5px;
`;

const AppListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AppList = ({ apps, selectedApp, position }) => {
  const [filter, setFilter] = useState('');

  const filteredApps = apps.filter(app => app.name.toLowerCase().includes(filter.toLowerCase()));

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <AppListContainer position={position}>
      <Input
        type="text"
        placeholder="Search by name..."
        value={filter}
        onChange={handleFilterChange}
      />
      <CardContainer>
        {filteredApps.map((app) => (
          <Card
            key={app.id}
            app={app}
            selectedApp={selectedApp}
            style={{ flexBasis: 'calc(25% - 20px)' }} // Adjust width
          />
        ))}
      </CardContainer>
    </AppListContainer>
  );
};

export default AppList;
