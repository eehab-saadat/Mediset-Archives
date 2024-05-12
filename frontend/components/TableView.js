import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const TableView = ({ filepath }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(filepath)
      .then(response => response.text())
      .then(data => {
        const parsedData = Papa.parse(data).data;
        setData(parsedData);
      });
  }, [filepath]);

  return (
    <table border="1">
      <thead>
        <tr>
          {data[0]?.map((header, index) => (
            <th key={index} border="1">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(1, 6).map((row, index) => (
          <tr key={index}>
            {row.map((cell, index) => (
              <td key={index} border="1">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;