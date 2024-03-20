import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import styled from 'styled-components';

const supabaseUrl = 'https://mgjxfvvcgxebiqxmvmyx.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Styled component for the container
const Container = styled.div`
  padding-left: 40px; /* Add left padding */
`;
const Button = styled.button`
  color: #fff;
  font-size: 1em;
  font-weight: bold;
  text-decoration: none;
  padding: .5em 1em;
  background-color: #333;
  border-radius: 8px;
  margin-right: 40px;
  margin-bottom: 10px;
  transition: background-color 0.3s; /* Add transition for smooth effect */

  &:hover {
    background-color: #ffef00;
    color: #333; /* Change text color on hover */
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

  if (!app) {
    return <div>Loading...</div>;
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
      <h2>{app.name}</h2>
      <img
        src= {logo}
        alt="Logo"
      />
      <p>{app.description}</p>
      <p>Total Votes: {app.votes || 0}</p>
      
      <Button>
        <StyledAnchor href={app.url} target="_blank">Check it out!</StyledAnchor>
      </Button>

      {/* Add more details about the app */}
      <button onClick={() => handleVote(app, 1)}>Upvote</button>
      <button onClick={() => handleVote(app, -1)}>Downvote</button>
    </Container>
  );
};

export default AppDetails;
