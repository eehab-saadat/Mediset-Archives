//import * as React from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Card from '../components/CardComponent';
import SharedDatasets from '../styles/OwnedSharedDatasets.module.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OwnedSharedDatasets() {
    const [datasets, setDatasets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/apis/datasets/?ordered=True&limit=5')
            .then(response => {
                const datasets = response.data;
                // Fetch usernames for each dataset
                const userPromises = datasets.map(dataset => 
                    axios.get(`http://localhost:8000/apis/users/${dataset.OwnerID}`)
                );
                return Promise.all([datasets, ...userPromises]);
            })
            .then(([datasets, ...userResponses]) => {
                // Add username to each dataset
                const datasetsWithUsernames = datasets.map((dataset, index) => ({
                    ...dataset,
                    userName: userResponses[index].data.username
                }));
                setDatasets(datasetsWithUsernames);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div className={SharedDatasets.cards}>
            {datasets.map((dataset, index) => (
                <Card 
                    key={dataset.DatasetID}
                    name={dataset.Name} 
                    description={dataset.Description}
                    userName={`User ${dataset.OwnerID}`}
                    votesCount={dataset.VoteCount}
                    image={'/netflix.jpg'}
                />
            ))}
        </div>
    );
}