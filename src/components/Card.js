import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for the card
const CardContainer = styled.div`
  border: 2px solid #1F3251;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  width: calc(25% - 4px); /* Adjust width to fill space horizontally */
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #D64800; /* Change the border color on hover */
  }

  @media (max-width: 768px) {
    width: calc(33.33% - 4px); /* Adjust width for smaller screens */
  }

  @media (max-width: 576px) {
    width: calc(50% - 4px); /* Adjust width for even smaller screens */
  }
`;

const CardLink = styled(Link)`
  text-decoration: none; /* Remove underline */
  color: inherit; /* Inherit the color from the parent */

  &:hover {
    color: #D64800; /* Change the link color on hover */
  }
`;

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



// Card component definition
const Card = ({ app }) => {
  const cleanUrlForLogo = removeHttpAndWww(app.url);
  const logo = `https://logo.clearbit.com/${cleanUrlForLogo}`;
  
  return (
    <CardContainer>
      <CardLink to={`/app/${app.id}`}>
        {/* Display app details */}
        <img
        src= {logo} width="50"
        alt="Logo"
        />
        <h3>{app.name}</h3>
        <p>{app.description}</p>
      </CardLink>
    </CardContainer>
  );
};

export default Card;
