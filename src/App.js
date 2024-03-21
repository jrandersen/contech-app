import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import Header from './components/Header';
import Footer from './components/Footer';
import AppList from './components/AppList';
import NewAppModal from './components/NewAppModal';
import AppDetails from './components/AppDetails';
import styled from 'styled-components';

const supabaseUrl = 'https://mgjxfvvcgxebiqxmvmyx.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding-top: 15px;
  padding-bottom: 5px;
`;

function App() {
  const [apps, setApps] = useState([]);
  const [showNewAppModal, setShowNewModal] = useState(false);

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const { data, error } = await supabase
        .from('construction_apps')
        .select('*')
        .order('votes', { ascending: false });

      if (error) {
        console.error('Error fetching apps:', error);
        return;
      }

      setApps(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  const handleNewAppButtonClick = () => {
    setShowNewModal(true);
  };

  return (
    <AppContainer>
      <Router>
        <Header
          handleNewAppButtonClick={handleNewAppButtonClick}
        />
        <MainContent>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <AppList apps={apps} />
              }
            />
            <Route path="/app/:id" element={<AppDetails />} />
          </Routes>
        </MainContent>
        <NewAppModal showModal={showNewAppModal} setShowModal={setShowNewModal} />
        <Footer />
      </Router>
    </AppContainer>
  );
}

export default App;
