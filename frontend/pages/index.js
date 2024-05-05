import * as React from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import homeStyles from '../styles/Home.module.css';
import SignIN from './SignIn'
import Card from '../components/CardComponent';
import SearchBar from '../components/SearchBar';
import Drawer from '../components/Drawer';
import OwnedSharedDatasets from './OwnedSharedDatasets';
export default function Home() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
    
      <SearchBar  />
      <div className={homeStyles.container}>
        <div className={homeStyles.CardContainer}>
         <OwnedSharedDatasets />
    
    </div>
    </div>
    </>

);

}