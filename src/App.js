import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

const mailchimpUrl = 'YOUR_MAILCHIMP_URL';
const mailchimpApiKey = 'YOUR_MAILCHIMP_API_KEY';

function App() {
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [email, setEmail] = useState('');

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
      <h1>Construction Tech Applications</h1>
      <ul>
        {apps.map((app) => (
          <li key={app.id} onClick={() => handleAppClick(app)}>
            {app.name}
          </li>
        ))}
      </ul>
      {selectedApp && (
        <div>
          <h2>{selectedApp.name}</h2>
          <img src={selectedApp.company_image} alt={`${selectedApp.name} logo`} />
          <p>
            Website: <a href={selectedApp.url} target="_blank" rel="noopener noreferrer">{selectedApp.url}</a>
          </p>
          <p>Votes: {selectedApp.votes}</p>
          <button onClick={() => handleVote(selectedApp, 1)}>Upvote</button>
          <button onClick={() => handleVote(selectedApp, -1)}>Downvote</button>
        </div>
      )}
      <h2>Subscribe to Newsletter</h2>
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
    </div>
  );
}

export default App;