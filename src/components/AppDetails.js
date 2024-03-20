import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mgjxfvvcgxebiqxmvmyx.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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

  return (
    <div>
      <h2>{app.name}</h2>
      <p>{app.description}</p>
      {/* Add more details about the app */}
      <button onClick={() => handleVote(app, 1)}>Upvote</button>
      <button onClick={() => handleVote(app, -1)}>Downvote</button>
    </div>
  );
};

export default AppDetails;