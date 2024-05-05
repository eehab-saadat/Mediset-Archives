import * as React from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import homeStyles from '../styles/Home.module.css';
import SignIn from './login'
import Card from '../components/CardComponent';
import SearchBar from '../components/SearchBar';
import Drawer from '../components/Drawer';
import OwnedSharedDatasets from './OwnedSharedDatasets';
export default function Home() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
<<<<<<< HEAD
    <div className={homeStyles.container}>
      <div className={homeStyles.CardContainer}>
          <SignIn/>
      </div>
=======
    
      <SearchBar  />
      <div className={homeStyles.container}>
        <div className={homeStyles.CardContainer}>
         <OwnedSharedDatasets />
    
    </div>
>>>>>>> c6ffb78748dbfa55827528ff9e60911e9768361f
    </div>
    </>

);

}