//import * as React from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Card from '../components/CardComponent';
import SharedDatasets from '../styles/OwnedSharedDatasets.module.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function OwnedSharedDatasets() {
    const [datasets, setDatasets] = useState([]);
    const [isOwner, setIsOwner] = useState(null);

    useEffect(() => {
        // HERE IS THE ISOWNER REQUEST, UNCOMMENT ALL TE COMMENTS IN THIS FILE TO RUN IT
        // axios.get('http://localhost:8000/apis/isowner/?OwnerID=1')
        //     .then(response => {
        //         setIsOwner(response.data.response === 'true');
        //     }).catch(error => {
        //         console.error('There was an error!', error);
        //     });
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
                    userName: userResponses[index].data.Username
                }));
                setDatasets(datasetsWithUsernames);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    // if (isOwner === null) {
    //     return <div>Loading...</div>;
    // }

    return (
        // isOwner ?
        <div className={SharedDatasets.cards}>
            {datasets.map((dataset, index) => (
                <Link href={`/dataset/${dataset.DatasetID}`} key={dataset.DatasetID}>
                <Card 
                    key={dataset.DatasetID}
                    name={dataset.Name} 
                    description={dataset.Description}
                    userName={`User ${dataset.userName}`}
                    votesCount={dataset.VoteCount}
                    image={'/netflix.jpg'}
                />
                </Link>
            ))}
        </div> 
        // : <h1>403 Forbidden</h1>
    );
}