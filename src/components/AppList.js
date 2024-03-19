import React from 'react';
import styled from 'styled-components';

const AppList = ({ apps, handleAppClick }) => {
  return (
    <div style={{ overflowY: 'auto', height: 'calc(100vh - 220px)' }}>
      {apps.map((app) => (
        <Card key={app.id} onClick={() => handleAppClick(app)}>
          <li>
            <div>
              <h2>{app.name}</h2>
              <p>Total Votes: {app.votes || 0}</p>
            </div>
          </li>
        </Card>
      ))}
    </div>
  );
};

const Card = styled.ul`
  list-style-type: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

export default AppList;
