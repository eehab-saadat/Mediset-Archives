import { useRouter } from 'next/router'
import { useState } from 'react'
import Dataset from '../Dataset'

export default function DatasetPage({ dataset, user }) {
  const router = useRouter()
  const { id } = router.query

  const [editableDataset, setEditableDataset] = useState(dataset)

  // const handleSave = async () => {
  //   const res = await fetch(`http://localhost:8000/apis/datasets/${id}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(editableDataset),
  //   })

  //   if (res.ok) {
  //     // Handle successful save here
  //   } else {
  //     // Handle error here
  //   }
  // }
  const [dataset, setDatasets] = React.useState([
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
    <Dataset
      dataset={dataset}
      // setDataset={setEditableDataset}
      user={user}
      onSave={handleSave}
    />
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:8000/apis/datasets/${id}`);
  const dataset = await res.json();

  // Fetch the current user here
  const user = null 

  return {
    props: {
      dataset,
      user,
    },
  };
}