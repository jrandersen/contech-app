import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';
import AppList from './components/AppList';
import NewAppModal from './components/NewAppModal'
import AppModal from './components/AppModal';
import styled from 'styled-components';

const supabaseUrl = 'https://mgjxfvvcgxebiqxmvmyx.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const mailchimpUrl = process.env.REACT_APP_MAILCHIMP_URL;
const mailchimpApiKey = process.env.REACT_APP_MAILCHIMP_API_KEY;

// console.log('Mailchimp API Key:', process.env.REACT_APP_MAILCHIMP_API_KEY);

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
    console.log("button clicked")
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
    setShowNewModal(true);
  };

  const handleUpdate = async (updatedApp) => {
    const { error } = await supabase
      .from('construction_apps')
      .update(updatedApp)
      .eq('id', updatedApp.id);
    if (error) {
      console.error('Error updating app:', error);
    } else {
      fetchApps();
    }
  };

  const handleDelete = async (appId) => {
    try {
      const { error } = await supabase.from('construction_apps').delete().eq('id', appId);
      if (error) {
        throw error;
      }
      // If deletion is successful, update the apps state to reflect the changes
      const updatedApps = apps.filter((app) => app.id !== appId);
      setApps(updatedApps);
      console.log('App deleted successfully.');
      alert('App deleted successfully.');
    } catch (error) {
      console.error('Error deleting app:', error.message);
    }
  };

  return (
    <AppContainer>
      <Header
        handleSubscribe={handleSubscribe}
        handleNewAppButtonClick={handleNewAppButtonClick}
        setEmail={setEmail}
      />
      <AppList
        apps={apps}
        handleAppClick={handleAppClick}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}  // Pass handleUpdate to AppList
      />
      {selectedApp && (
      <AppModal 
        showModal={showModal} 
        selectedApp={selectedApp} 
        handleVote={handleVote} 
        setShowModal={setShowModal} 
      />)}
      <NewAppModal showModal={showNewAppModal} setShowModal={setShowNewModal} />
      <Footer />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  padding-top: 130px;
  padding-bottom: 30px;
`;

export default App;
