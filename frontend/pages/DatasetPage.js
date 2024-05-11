import { useRouter } from 'next/router'
import { useState } from 'react'
import Dataset from '../Dataset'
import axios from 'axios';

export default function DatasetPage({ dataset: initialDataset, user }) {
  const router = useRouter()
  const { id } = router.query

  const [dataset, setDataset] = useState(initialDataset)

  const handleSave = () => {
    // Update the dataset here
  }

  return (
    <Dataset
      dataset={dataset}
      setDataset={setDataset}
      user={user}
      onSave={handleSave}
    />
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const res = await axios.get(`http://localhost:8000/apis/datasets/${id}`);
    const dataset = res.data;

    // Fetch the current user here
    const user = null 

    return {
      props: {
        dataset,
        user,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: error.message,
      },
    };
  }
}