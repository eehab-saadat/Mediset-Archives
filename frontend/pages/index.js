import * as React from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import homeStyles from '../styles/Home.module.css';
import LogIn from './Login'
import Card from '../components/CardComponent';
export default function Home() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
    <div className={homeStyles.container}>
      <div className={homeStyles.CardContainer}>
          <LogIn/>
      </div>
    </div>
    </>
);

}