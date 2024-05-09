import * as React from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Card from '../components/CardComponent';
import SharedDatasets from '../styles/OwnedSharedDatasets.module.css'

export default function OwnedSharedDatasets() {
    const DatasetType = ['Owned Datasets', 'Shared Datasets'];
    const DatasetDescription = ['The Netflix Titles dataset is a comprehensive compilation of movies and TV shows available on Netflix.','This dataset is scraped from IMDB\'s website. It may be used for regression, designing recommendation systems'
    ];
    const votesCount = 10;
    const DatasetUser = ['John Doe, Jane Doe']; 
   //array for imagepaths
    const imagePath = ['/imdb.jpg', '/netflix.jpg'];
    return (
        <>
        <div className={SharedDatasets.cards}>
            <Card name={DatasetType[0]} 
                  description={DatasetDescription[0]}
                  userName={DatasetUser[0]}
                  votesCount={votesCount}
                  image={imagePath[0]}
            />
             <Card name={DatasetType[1]} 
                  description={DatasetDescription[1]}
                  userName={DatasetUser[1]}
                  votesCount={votesCount}
                  image={imagePath[1]}
            />
            
        </div>
        </>
    );
    }


    