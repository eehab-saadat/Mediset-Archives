import TableView from '../components/TableView';

export default function Tabular() {
  const filepath = '/storage/data.csv';

  return (
    <div>
      <TableView filepath={filepath} />
    </div>
  );
}