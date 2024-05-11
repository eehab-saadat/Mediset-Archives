import * as React from 'react';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import Card from '../components/CardComponent';
import SharedDatasets from '../styles/OwnedSharedDatasets.module.css'
import Link from 'next/link'

export default function OwnedSharedDatasets({datasets}) {
 
    return (
        <>
        <div className={SharedDatasets.cards}>
            {datasets && datasets.map(dataset => (
               
                   
                        <Card
                        key={dataset.DatasetID}
                        name={dataset.Name}
                        description={dataset.Description}
                        userName={dataset.OwnerID} 
                        votesCount={dataset.VoteCount}
                        image={dataset.StoragePath} 
                        />
                   
             
            ))}
        </div>
        </>
    );  
}















































// import * as React from 'react';
// import Head from 'next/head';
// import Layout, { siteTitle } from '../components/layout';
// import utilStyles from '../styles/utils.module.css';
// import Card from '../components/CardComponent';
// import SharedDatasets from '../styles/OwnedSharedDatasets.module.css'

// export default function OwnedSharedDatasets({datasets}) {
//     const DatasetType = ['Owned Datasets', 'Shared Datasets'];
//     const DatasetDescription = ['The Netflix Titles dataset is a comprehensive compilation of movies and TV shows available on Netflix.','This dataset is scraped from IMDB\'s website. It may be used for regression, designing recommendation systems'
//     ];
//     const votesCount = 10;
//     const DatasetUser = ['John Doe, Jane Doe']; 
//    //array for imagepaths
//     const imagePath = ['/imdb.jpg', '/netflix.jpg'];
//     return (
//         <>
        
//         <div className={SharedDatasets.cards}>
//             {datasets.map(dataset => (
//                 <Card
//                 key={dataset.DatasetID}
//                 name={dataset.Name}
//                 description={dataset.Description}
//                 userName={dataset.OwnerID} // Replace with actual user name if available
//                 votesCount={dataset.VoteCount}
//                 image={dataset.StoragePath} // Replace with actual image path if available
//                 />
//             ))}
//     </div>
//         </>
//     );
//     }


    