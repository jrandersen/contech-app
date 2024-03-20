import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for the card
const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  width: calc(25% - 20px); /* Adjust width to fill space horizontally */
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #007bff; /* Change the border color on hover */
  }

  @media (max-width: 768px) {
    width: calc(33.33% - 20px); /* Adjust width for smaller screens */
  }

  @media (max-width: 576px) {
    width: calc(50% - 20px); /* Adjust width for even smaller screens */
  }
`;

const CardLink = styled(Link)`
  text-decoration: none; /* Remove underline */
  color: inherit; /* Inherit the color from the parent */

  &:hover {
    color: #007bff; /* Change the link color on hover */
  }
`;

// Card component definition
const Card = ({ app }) => {
  return (
    <CardContainer>
      <CardLink to={`/app/${app.id}`}>
        {/* Display app details */}
        <h3>{app.name}</h3>
        <p>Total Votes: {app.votes || 0}</p>
      </CardLink>
    </CardContainer>
  );
};

export default Card;
