import { useEffect, useState } from 'react';
import CardComponent from './CardComponent';
import { Container, Grid, Box } from '@mui/material';
import axios from 'axios';

const CardContainer = ({ limit, ordered, contains }) => {
    const [cards, setCards] = useState([]);
    const [datasets, setDatasets] = useState([]);

    // Fetch datasets from API with optional query parameters
    let apiUrl = `http://localhost:8000/apis/datasets/?limit=${limit}`;
    if (ordered) apiUrl += '&ordered=true';
    if (contains) apiUrl += `&contains=${contains}`;
    useEffect(() => {
        axios.get(apiUrl)
        // .then(response => {
        //     const data = response.data;
        //     setCards(data);
        //   })
        .then(response => {
            const datasets = response.data;
            console.log(datasets)
            // Fetch usernames for each dataset
            const userPromises = datasets.map(dataset => 
                axios.get(`http://localhost:8000/apis/users/${dataset.OwnerID}/`)
            );
            return Promise.all([datasets, ...userPromises]);
        })
        .then(([datasets, ...userResponses]) => {
            // Add username to each dataset
            const datasetsWithUsernames = datasets.map((dataset, index) => ({
                ...dataset,
                userName: userResponses[index].data.Username
            }));
            setDatasets(datasetsWithUsernames);
            setCards(datasetsWithUsernames);
            console.log(datasetsWithUsernames);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
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
                                userName={card.userName}
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
