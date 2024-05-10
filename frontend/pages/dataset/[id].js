// pages/dataset/[id].js
import { useRouter } from 'next/router'
import Dataset from '../Dataset'

export default function DatasetPage({ dataset }) {
  const router = useRouter()
  const { id } = router.query

  return <Dataset dataset={dataset} />
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(`http://localhost:8000/apis/datasets/${id}`);
  const dataset = await res.json();

  return {
    props: {
      dataset,
    },
  };
}