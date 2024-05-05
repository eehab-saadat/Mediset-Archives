import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import homeStyles from '../styles/Home.module.css';
import SignIn from './SignIn'
import Card from '../components/CardComponent';
import LoginIn from './LoginIn';
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