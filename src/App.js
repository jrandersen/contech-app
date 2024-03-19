import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import NewAppModal from './newAppModal';
import styled from 'styled-components';

const supabaseUrl = 'https://mgjxfvvcgxebiqxmvmyx.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const mailchimpUrl = process.env.REACT_APP_MAILCHIMP_URL;
const mailchimpApiKey = process.env.REACT_APP_MAILCHIMP_API_KEY;

console.log('Mailchimp API Key:', process.env.REACT_APP_MAILCHIMP_API_KEY);

const mailchimp = require("@mailchimp/mailchimp_marketing");


function App() {
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showNewAppModal, setShowNewModal] = useState(false)

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    const { data, error } = await supabase
      .from('construction_apps')
      .select('*')
      .order('votes', { ascending: false }); // Order by 'votes' column in descending order
    if (error) {
      console.error('Error fetching apps:', error);
    } else {
      setApps(data);
    }
  };
  

  const handleAppClick = (app) => {
    setSelectedApp(app);
    setShowModal(true);
  };

  const handleVote = async (app, vote) => {
    const { error } = await supabase
      .from('construction_apps')
      .update({ votes: app.votes + vote })
      .eq('id', app.id);
    if (error) {
      console.error('Error updating votes:', error);
    } else {
      fetchApps();
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${mailchimpUrl}/subscribe`,
        {
          email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`apikey:${mailchimpApiKey}`)}`,
          },
        }
      );
      alert('You have been subscribed to the newsletter!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      alert('An error occurred while subscribing to the newsletter.');
    }
  };
  
  
  const handleNewAppButtonClick = () => {
    // console.log("buttonpushed")
    setShowNewModal(true);
  };


  return (
    <AppContainer>
      <Header>
        <h1>CONTECH TOOLS</h1>
        <FormContainer>
          <SubscribeForm onSubmit={handleSubscribe}>
            <EmailInput
              type="email"
              name="EMAIL"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type your email..."
            />
            <SubscribeButton type="submit">Subscribe</SubscribeButton>
          </SubscribeForm>
          <AddNewAppButton onClick={handleNewAppButtonClick}>Add New Tool</AddNewAppButton>
        </FormContainer>
      </Header>
      <div style={{ overflowY: 'auto', height: 'calc(100vh - 220px)' }}> {/* Adjust the height */}
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
      {showModal && selectedApp && (
        <div style={modalStyle}>
          <div style={modalContentStyle}>
            <span style={closeStyle} onClick={() => setShowModal(false)}>&times;</span>
            <h2>{selectedApp.name}</h2>
            <img src={selectedApp.company_image} alt={`${selectedApp.name} logo`} />
            <p>
              Website: <a href={selectedApp.url} target="_blank" rel="noopener noreferrer">{selectedApp.url}</a>
            </p>
            <p>Votes: {selectedApp.votes}</p>
            <button onClick={() => handleVote(selectedApp, 1)}>Upvote</button>
            <button onClick={() => handleVote(selectedApp, -1)}>Downvote</button>
          </div>
        </div>
      )}
      {showNewAppModal && <NewAppModal showModal={showNewAppModal} setShowModal={setShowNewModal} />}
      <footer style={footerStyle}>
        <p>&copy; 2024 CONTECH TOOLS.FYI | For more information, contact me <a href="https://www.linkedin.com/in/jason--andersen/">here</a></p>
      </footer>
    </AppContainer>

  );
}

// Inline styles for the header, newsletter, modal, and footer
const AppContainer = styled.div`
  padding-top: 130px;
  padding-bottom: 30px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #f5f4f0;
  color: #333;
  padding: 15px;
  z-index: 999;
`;

const FormContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SubscribeForm = styled.form`
  display: flex;
  align-items: center;
`;

const EmailInput = styled.input`
  margin-right: 5px; 
`;

const SubscribeButton = styled.button`
  margin-right: 20px; 
`;

const AddNewAppButton = styled.button`
  margin-right: 40px; 
`

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

const footerStyle = {
  position: 'fixed',
  bottom: '0',
  width: '100%',
  backgroundColor: '#f5f4f0',
  color: '#333',
  padding: '10px 0',
  textAlign: 'center',
  zIndex: '999'
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


export default App;
