import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DatasetTagsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:8000/apis/datasettags/');
      const promises = response.data.map(async item => {
        const tagResponse = await axios.get(`http://localhost:8000/apis/tags/${item.TagID}/`);
        const datasetResponse = await axios.get(`http://localhost:8000/apis/datasets/${item.DatasetID}/`);
        return {
          tagName: tagResponse.data.Name,
          datasetName: datasetResponse.data.Name,
          datasetDescription: datasetResponse.data.Description
        };
      });
      const results = await Promise.all(promises);
      console.log(results)
      setData(results);
    };
    fetchData();
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <h2>{item.tagName}</h2>
          <ul>
            <li>{item.datasetName} ({item.datasetDescription})</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default DatasetTagsPage;