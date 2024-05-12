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

export default function Home() {
    return (
        <OwnedSharedDatasets/>
    );  
}