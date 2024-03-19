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

  return (
    <AppContainer>
      <Header
        handleSubscribe={handleSubscribe}
        handleNewAppButtonClick={handleNewAppButtonClick}
        setEmail={setEmail}
      />
      <AppList apps={apps} handleAppClick={handleAppClick} />
      {showModal && <AppModal showModal={showModal} selectedApp={selectedApp} setShowModal={setShowModal} handleVote={handleVote}/>}
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
