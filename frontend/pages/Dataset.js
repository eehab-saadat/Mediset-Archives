import React, { useState } from 'react';
import { Typography, Grid, Box, Button, TextField } from '@mui/material';

export default function Dataset({ dataset, user, setDataset, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDataset, setEditedDataset] = useState(dataset);

  const isOwner = user && user.id === dataset.OwnerID;
  const isCollaborator = user && dataset.collaborators.includes(user.id);
  const canEdit = isOwner || isCollaborator;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    setDataset(editedDataset);
    onSave();
  };

  const handleChange = (event) => {
    setEditedDataset({
      ...editedDataset,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        {canEdit && !isEditing && (
          <Button variant="contained" color="primary" onClick={handleEditClick}>
            Edit
          </Button>
        )}
        {canEdit && isEditing && (
          <Button variant="contained" color="primary" onClick={handleSaveClick}>
            Save
          </Button>
        )}
        {isEditing ? (
          <TextField
            name="Name"
            label="Dataset Name"
            value={editedDataset.Name}
            onChange={handleChange}
          />
        ) : (
          <Typography variant="h6">{dataset.Name}</Typography>
        )}
        {isEditing ? (
          <TextField
            name="Description"
            label="Dataset Description"
            value={editedDataset.Description}
            onChange={handleChange}
          />
        ) : (
          <Typography variant="body1">{dataset.Description}</Typography>
        )}
        {/* Add similar code for other fields of the dataset */}
      </Grid>
    </Grid>
  );
}