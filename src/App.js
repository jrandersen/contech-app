import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const supabaseUrl = 'https://mgjxfvvcgxebiqxmvmyx.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const mailchimpUrl = process.env.REACT_APP_MAILCHIMP_URL;
const mailchimpApiKey = process.env.REACT_APP_MAILCHIMP_API_KEY;

function App() {
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    const { data, error } = await supabase.from('construction_apps').select('*');
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
    const { data, error } = await supabase
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

  return (
    <div>
      <h1>CONTECH TOOLS.FYI</h1>
      
      <h2>Sign up for weekly tools!</h2>
      <form onSubmit={handleSubscribe}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      
      <ul>
        {apps.map((app) => (
          <li key={app.id} onClick={() => handleAppClick(app)}>
            {app.name}
          </li>
        ))}
      </ul>
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

    </div>
  );
}

// Inline styles for the modal
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

export default App;
