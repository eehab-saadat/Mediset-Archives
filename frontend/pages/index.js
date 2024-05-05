import * as React from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import homeStyles from '../styles/Home.module.css';
<<<<<<< HEAD
import SignIn from './SignIn'
import Card from '../components/CardComponent';
import LoginIn from './LoginIn';
=======
import SignIn from './login'
import Card from '../components/CardComponent';
import SearchBar from '../components/SearchBar';
import Drawer from '../components/Drawer';
import OwnedSharedDatasets from './OwnedSharedDatasets';
>>>>>>> a61d49884662f9541b1d02f2a658911e9d719228
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