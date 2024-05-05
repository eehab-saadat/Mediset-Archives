import * as React from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Card from '../components/CardComponent';
import SharedDatasets from '../styles/OwnedSharedDatasets.module.css'

export default function OwnedSharedDatasets() {
    const DatasetType = ['Owned Datasets', 'Shared Datasets'];
   
    const imagePath = '/static/images/cards/contemplative-reptile.jpg';
    return (
        <>
        <div className={SharedDatasets.cards}>
            <Card name={DatasetType[0]} />
            <Card name={DatasetType[1]} />
        </div>
        </>
    );
    }
