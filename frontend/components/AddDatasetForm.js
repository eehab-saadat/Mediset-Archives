import React, { useState } from 'react';
import { Button, TextField, FormControlLabel, Switch } from '@mui/material';
import axios from 'axios';

export default function AddDatasetForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDatasetVisibility = () => {
        setIsPublic(!isPublic);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file ? file.name : null);
    };

    const handleCreateDataset = (event) => {
        event.preventDefault(); // Prevent form submission

        const username = localStorage.getItem("username")
        const response = axios.get("http://localhost:8000/apis/users/?username="+username)
        if (response===200) {
        
            // Create the dataset object
            let mydataset = {
                Name: name,
                Description: description,
                IsPublic: isPublic,
                OwnerID: response.UserID,
                StoragePath: selectedFile ? `D:/DB/Biosphere/frontend/public/storage/${selectedFile.name}` : ''
            };

            // Send a POST request to the /datasets/ endpoint using Axios
            axios.post('http://localhost:8000/apis/datasets/', mydataset)
                .then(response => {
                    console.log(response.data);
                    // Optionally, you can reset the form fields here
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
            <form style={{ width: '100%', maxWidth: '400px' }} onSubmit={handleCreateDataset}>
                <TextField
                    autoFocus
                    margin="normal"
                    id="name"
                    label="Title"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="normal"
                    id="description"
                    label="Add description"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <FormControlLabel
                    required
                    control={<Switch checked={isPublic} onChange={handleDatasetVisibility} />}
                    label="Make public"
                    labelPlacement='start'
                />
                <input
                    accept=".csv, .xlsx, .xls"
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
                        Choose File
                    </Button>
                </label>
                {selectedFile && <p>Selected File: {selectedFile}</p>}
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Button type="submit" variant="contained" color="primary">
                        Create
                    </Button>
                </div>
            </form>
        </div>
    );
}
