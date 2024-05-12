import React, { useState } from 'react';
import { Paper, Typography, Snackbar } from '@mui/material';

const DropBox = ({ accept, onFileUpload }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [fileUploaded, setFileUploaded] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && accept.includes(file.type)) {
      onFileUpload(file);
      setFileUploaded(file);
      setErrorMessage('');
      setSnackbarOpen(true);
    } else {
      setErrorMessage(`Invalid file type. Only ${accept.join(', ')} files are allowed.`);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Paper
        className="DropZone"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Typography variant="body1" component="p">
          Drag & drop your file here or click to browse
        </Typography>
        {errorMessage && (
          <Typography variant="body2" className="errorMNessage">
            {errorMessage}
          </Typography>
        )}
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={fileUploaded ? `File uploaded: ${fileUploaded.name}` : 'Unsupported file type'}
      />
    </>
  );
};

export default DropBox;
