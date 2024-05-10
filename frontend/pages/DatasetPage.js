import { useRouter } from 'next/router'
import { useState } from 'react'
import Dataset from '../Dataset'

export default function DatasetPage({ dataset, user }) {
  const router = useRouter()
  const { id } = router.query

  const [editableDataset, setEditableDataset] = useState(dataset)

  const handleSave = async () => {
    const res = await fetch(`http://localhost:8000/apis/datasets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editableDataset),
    })

    if (res.ok) {
      // Handle successful save here
    } else {
      // Handle error here
    }
  }

  return (
    <Dataset
      dataset={editableDataset}
      setDataset={setEditableDataset}
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