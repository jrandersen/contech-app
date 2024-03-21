import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://mgjxfvvcgxebiqxmvmyx.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


const NewAppModal = ({ showModal, setShowModal }) => {
  const [appName, setAppName] = useState('');
  const [appURL, setAppURL] = useState('');
  const [companyImage, setCompanyImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Insert the new app data into the Supabase database
      const { data, error } = await supabase
        .from('construction_apps')
        .insert([{ name: appName, url: appURL, company_image: companyImage }]);
      if (error) {
        throw error;
      }
      console.log('New app added:', data);
      alert('New app added:', data);
      // Clear the input fields after successful submission
      setAppName('');
      setAppURL('');
      setCompanyImage('');
      // Close the modal
      setShowModal(false);
    } catch (error) {
      console.error('Error adding new app:', error.message);
    }
  };

  return (
    <div style={showModal ? modalStyle : { display: 'none' }}>
      <div style={modalContentStyle}>
        <span style={closeStyle} onClick={() => setShowModal(false)}>&times;</span>
        <h2>Submit an App</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Application Name" required value={appName} onChange={(e) => setAppName(e.target.value)} style={inputStyle} />
          <input type="text" placeholder="Application URL" required value={appURL} onChange={(e) => setAppURL(e.target.value)} style={inputStyle} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

// CSS for NewAppModal inputs
const inputStyle = {
    display: 'block',
    width: '100%',
    marginBottom: '10px',
  };
  
const modalStyle = {
    display: 'block', /* Show the modal */
    position: 'fixed',
    zIndex: '1',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.4)' /* Black background with transparency */
  };
  
  const modalContentStyle = {
    position: 'relative',
    backgroundColor: '#fefefe',
    margin: '15% auto', /* Center the modal vertically and horizontally */
    padding: '20px',
    border: '1px solid #888',
    width: '80%',
    maxWidth: '600px' /* Limit the maximum width of the modal */
  };
  
  const closeStyle = {
    position: 'absolute',
    top: '0',
    right: '0',
    color: '#aaa',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer'
  };

export default NewAppModal;
