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
import Dataset from './Dataset';
export default function Home() {
  const [open, setOpen] = React.useState(false);



  // React.useEffect(() => {
  //   fetch('http://localhost:8000/apis/datasets/?ordered=True&limit=1')
  //     .then(response => response.json())
  //     .then(data => setDatasets(data.results)); // use data.results if the data is paginated
  // }, []);



  const [datasets, setDatasets] = React.useState([
    {
      "DatasetID": 1,
      "Name": "PCOS Dataset",
      "Description": "Some description.",
      "StoragePath": "/files/pcos_dataset.csv",
      "CreatedAt": "2024-05-05T11:29:27.382676Z",
      "LastEditedAt": "2024-05-05T11:29:27.382676Z",
      "VoteCount": 1,
      "DownloadCount": 3,
      "CommentCount": 0,
      "IsPublic": true,
      "OwnerID": 1,
      "LastEditedBy": 1
    },
    {
      "DatasetID": 2,
      "Name": "COVID Dataset",
      "Description": "Some description.",
      "StoragePath": "/files/covid_dataset.csv",
      "CreatedAt": "2024-05-05T11:30:21.759934Z",
      "LastEditedAt": "2024-05-05T11:30:21.759934Z",
      "VoteCount": 2,
      "DownloadCount": 3,
      "CommentCount": 0,
      "IsPublic": true,
      "OwnerID": 2,
      "LastEditedBy": 2
    }
  ]);

  return (
    <>
      <SearchBar  />
      <div className={homeStyles.container}>
      <div className={homeStyles.CardContainer}>
        {/* <OwnedSharedDatasets datasets={datasets} /> */}
        <Dataset />
      </div>
      </div>
    </>
  );
}

