import { useEffect, useState } from 'react';
import CardComponent from './CardComponent';
import { Container, Grid, Box } from '@mui/material';

const CardContainer = ({ limit, ordered, contains }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Fetch datasets from API with optional query parameters
    let apiUrl = `http://localhost:8000/apis/datasets/?limit=${limit}`;
    if (ordered) apiUrl += '&ordered=true';
    if (contains) apiUrl += `&contains=${contains}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setCards(data))
      .catch(error => console.error('Error fetching datasets:', error));
  }, [limit, ordered, contains]);

  return (
    <Container>
      <Box
        style={{
          overflowX: 'scroll',
          whiteSpace: 'nowrap',
          paddingX: 2,
          display: 'inline-block',
        }}
      >
        <Grid container spacing={2} style={{ minWidth: 'fit-content' }}>
          {cards.map(card => (
            <Grid item key={card.DatasetID} style={{ display: 'inline-block' }}>
              <CardComponent
                name={card.Name}
                description={card.Description}
                userName={card.OwnerID.username}
                votesCount={card.VoteCount}
                image={'/ik.png'}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CardContainer;
