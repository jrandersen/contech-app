import React from 'react';
import Card from './Card';

const AppList = ({ apps, selectedApp }) => {
  return (
    <div>
      {apps.map((app) => (
        <Card
          key={app.id}
          app={app}
          selectedApp={selectedApp}
        />
      ))}
    </div>
  );
};

export default AppList;