import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import homeStyles from '../styles/Home.module.css';
import SignIn from './LogIn'
import Card from '../components/CardComponent';
export default function Home() {
  return (
    <>
    <div className={homeStyles.container}>
      <div className={homeStyles.CardContainer}>
          <SignIn/>
      </div>
    </div>
    </>

);

}