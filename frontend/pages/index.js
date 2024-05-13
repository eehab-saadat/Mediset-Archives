//import * as React from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Card from '../components/CardComponent';
import SharedDatasets from '../styles/OwnedSharedDatasets.module.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LogIn from './LogIn';
import OwnedSharedDatasets from './OwnedSharedDatasets';
import Dataset from './Dataset';
import Search from '@mui/icons-material/Search';
import SearchBar from '../components/SearchBar';
import AddDatasetForm from '../components/AddDatasetForm';

export default function Home() {
    return (
        <LogIn/>
        // <>
        //     <SearchBar />
        //     {/* <Dataset /> */}
        //     <AddDatasetForm />
        // </>

    );  
}