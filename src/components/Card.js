import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for the card
const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

// Card component definition
const Card = ({ app, handleUpdate, handleDelete, handleAppClick }) => {

  return (
    <CardContainer>
      <Link to={`/app/${app.id}`}>
        {/* Display app details */}
        <h3>{app.name}</h3>
        <p>Total Votes: {app.votes || 0}</p>
      </Link>
    </CardContainer>
  );
};

export default Card;
