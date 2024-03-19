import React from 'react';import Card from './Card'; // Import the Card component

const AppList = ({ apps, handleAppClick, handleUpdate, confirmDelete, showConfirmation, cancelDelete, handleDelete, selectedApp }) => {
  return (
    <div>
      {apps.map((app) => (
        <Card
          key={app.id}
          app={app}
          handleAppClick={handleAppClick}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          confirmDelete={confirmDelete}
          showConfirmation={showConfirmation}
          cancelDelete={cancelDelete}
          selectedApp={selectedApp} // Pass selectedApp to Card component
        />
      ))}
    </div>
  );
};


export default AppList;