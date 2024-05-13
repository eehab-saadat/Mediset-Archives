import PrimarySearchAppBar from "../components/SearchBar";
import CardContainer from "../components/CardContainer";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function HomePage({user}) {
    const [datasetsWithUsernames, setDatasets] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/apis/datasets/?ordered=True&limit=5')
            .then(response => {
                const datasets = response.data;
                const userPromises = datasets.map(dataset => 
                    axios.get(`http://localhost:8000/apis/users/${dataset.OwnerID}`)
                );
                return Promise.all([datasets, ...userPromises]);
            })
            .then(([datasets, ...userResponses]) => {
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

    return (
        <div>
            <PrimarySearchAppBar />
            <br/><br/>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h2>Top Datasets</h2>
                {datasetsWithUsernames.map(dataset => (
                    <Link href={`/dataset/${dataset.DatasetID}`} key={dataset.DatasetID}>
                        <CardContainer limit={3} ordered style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}/>
                    </Link>
                ))}
                <h2>Datasets for You</h2>
                {datasetsWithUsernames.map(dataset => (
                    <Link href={`/dataset/${dataset.DatasetID}`} key={dataset.DatasetID}>
                        <CardContainer limit={3} contains={''} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}/>
                    </Link>
                ))}
                <h2>Others</h2>
                {datasetsWithUsernames.map(dataset => (
                    <Link href={`/dataset/${dataset.DatasetID}`} key={dataset.DatasetID}>
                        <CardContainer limit={10} contains={''} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}/>
                    </Link>
                ))}
            </div>
        </div>
    );
}