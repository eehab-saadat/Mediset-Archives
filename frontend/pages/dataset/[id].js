// pages/dataset/[id].js
import { useRouter } from 'next/router'
import Dataset from '../Dataset'
import axios from 'axios';

export default function DatasetPage({ dataset }) {
  const router = useRouter()
  const { id } = router.query

  return <Dataset dataset={dataset} />
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  try {
    const res = await axios.get(`http://localhost:8000/apis/datasets/${id}`);
    const dataset = res.data;

    return {
      props: {
        dataset,
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