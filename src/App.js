import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import ReactPaginate from 'react-paginate';
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

const PaginationButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ddd;
  }
`;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

// const PageLink = styled.a`
//   display: inline-block;
//   padding: 5px 10px;
//   margin: 0 5px;
//   background-color: ${({ active }) => (active ? '#007bff' : 'transparent')};
//   color: ${({ active }) => (active ? '#fff' : '#333')};
//   border: 1px solid #ccc;
//   cursor: pointer;
//   transition: background-color 0.3s, color 0.3s;
//   text-decoration: none;

//   &:hover {
//     background-color: #ddd;
//     color: #333;
//   }
// `;

function App() {
  const [apps, setApps] = useState([]);
  const [showNewAppModal, setShowNewModal] = useState(false);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(12);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    fetchApps();
  }, [offset]);

  const fetchApps = async () => {
    try {
      const { data, error } = await supabase
        .from('construction_apps')
        .select('*')
        .order('votes', { ascending: false })
        .range(offset, offset + perPage - 1);

      if (error) {
        console.error('Error fetching apps:', error);
        return;
      }

      setApps(data);

      const { count: totalCount, error: countError } = await supabase
        .from('construction_apps')
        .select('count', { count: 'exact' });

      if (countError) {
        console.error('Error fetching count:', countError);
        return;
      }

      setPageCount(Math.ceil(totalCount / perPage));

    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * perPage);
    setOffset(offset);
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
                <>
                  <AppList apps={apps} handleVote={handleVote} />
                  {pageCount > 1 && (
                    <PaginationContainer>
                      <PaginationButton onClick={() => handlePageClick({ selected: 0 })}>Previous</PaginationButton>
                        
                      <PaginationButton onClick={() => handlePageClick({ selected: pageCount - 1 })}>Next</PaginationButton>
                    </PaginationContainer>
                  )}
                </>
              }
            />
            <Route path="/app/:id" element={<AppDetails handleVote={handleVote} />} />
          </Routes>
        </MainContent>
        <NewAppModal showModal={showNewAppModal} setShowModal={setShowNewModal} />
        <Footer />
      </Router>
    </AppContainer>
  );
}

export default App;
