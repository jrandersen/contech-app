import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import styled from 'styled-components';

const supabaseUrl = 'https://mgjxfvvcgxebiqxmvmyx.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Styled component for the container
const Container = styled.div`
  margin-top: 10px;
  padding-left: 145px; /* Add left padding */
  min-height: 100vh;
`;

const Button = styled.button`
  color: #fff;
  font-size: 1em;
  font-weight: bold;
  text-decoration: none;
  padding: .5em 1em;
  background-color: #1F3251;
  border-radius: 8px;
  border: none;
  margin-right: 40px;
  margin-bottom: 10px;
  transition: background-color 0.3s; /* Add transition for smooth effect */

  &:hover {
    background-color: #D64800;
    color: #1F3251; /* Change text color on hover */
  }
`;

// Define a styled anchor component
const StyledAnchor = styled.a`
  color: white;
  text-decoration: none;
  
  &:hover {
    color: #333; /* Change text color on hover */
  }
`;

// Main Function
const AppDetails = ({ handleVote }) => {
  const { id } = useParams();
  const [app, setApp] = useState(null);

  useEffect(() => {
    const fetchApp = async () => {
      const { data, error } = await supabase
        .from('construction_apps')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching app:', error);
      } else {
        setApp(data);
      }
    };

    fetchApp();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on component mount
  }, []); // Ensure this effect runs only once on component mount

  if (!app) {
    return <div style={{ minHeight: '100vh' }}>Loading...</div>;
  }

  function removeHttpAndWww(url) {
    // Remove HTTP(S)
    if (url.startsWith("https://")) {
        url = url.slice(8); // Remove first 8 characters ("https://")
    } else if (url.startsWith("http://")) {
        url = url.slice(7); // Remove first 7 characters ("http://")
    }

    // Remove WWW
    if (url.startsWith("www.")) {
        url = url.slice(4); // Remove first 4 characters ("www.")
    }

    return url;
  }

  const cleanUrlForLogo = removeHttpAndWww(app.url);
  const logo = `https://logo.clearbit.com/${cleanUrlForLogo}`;
  
  return (
    <Container>
      <img
        src= {logo}
        alt="Logo"
      />
      <h2>{app.name}</h2>
      <p>{app.description}</p>
      
      <Button>
        <StyledAnchor href={app.url} target="_blank">Check it out!</StyledAnchor>
      </Button>

    </Container>
  );
};

export default AppDetails;
