// class Dataset(models.Model):
//     Name = models.CharField(max_length=20, null=False, unique=True)
//     Description = models.CharField(max_length=60, null=True)
//     OwnerID = models.ForeignKey(User, on_delete=models.CASCADE)
//     StoragePath = models.CharField(max_length=50, null=False, unique=True)
//     CreatedAt = models.DateTimeField(auto_now_add=True)
//     VoteCount = models.IntegerField(default=0)
//     DownloadCount = models.IntegerField(default=0)
//     CommentCount = models.IntegerField(default=0)
//     IsPublic = models.BooleanField(default=False)

// components/CreateDatasetForm.js

// import React, { useState } from 'react';
// import { makeStyles } from '@mui/styles';
// import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Switch } from '@mui/material';
// import { Label } from '@mui/icons-material';
// import DropBox from './DropBox';

// const AddDatasetForm = ({ open, handleClose, user }) => {
//     const [name, setName] = useState('');
//     const [description, setDescription] = useState('');
//     const [isPublic, setIsPublic] = useState(false);

//     const handleDatasetVisibility = () => {
//         setIsPublic(!isPublic);
//     };

//     const handleCreateDataset = () => {
//     // Here you can implement the logic to create the dataset
//     // For example, you can send a POST request to your backend API
//     console.log("Name:", name);
//     console.log("Description:", description);
//     console.log("Owner:", user.username);
//     handleClose();
//     };

//     return (
//     <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title">Create Dataset</DialogTitle>
//         <DialogContent>
//         <DialogContentText>
//             Please fill out the information below to create a new dataset.
//         </DialogContentText>
//         <form className= "newDatasetForm" onSubmit={handleCreateDataset}>
//             <TextField
//             autoFocus
//             margin="normal"
//             id="name"
//             label="Title"
//             type="text"
//             fullWidth
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             />
//             <TextField
//             margin="normal"
//             id="description"
//             label="Add description"
//             type="text"
//             fullWidth
//             multiline
//             rows={4}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             />
//             <FormControlLabel required control={<Switch onChange={handleDatasetVisibility}/>}  label="Make public" labelPlacement='start' />
//         </form>
//         </DialogContent>
//         <DialogActions>
//         <Button onClick={handleClose} color="primary">
//             Cancel
//         </Button>
//         <Button onClick={handleCreateDataset} color="primary">
//             Create
//         </Button>
//         </DialogActions>
//     </Dialog>
//     );
// };

// export default AddDatasetForm;
import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, Switch } from '@mui/material';
import axios from 'axios';

export default function AddDatasetForm(){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [open, setOpen] = useState(false); // Manage dialog open state

    const user = { username: 'username' }; // Replace with actual user data

    const handleDatasetVisibility = () => {
        setIsPublic(!isPublic);
    };

    const handleCreateDataset = (event) => {
        event.preventDefault(); // Prevent form submission

        // Create the dataset object
        const dataset = {
            Name: name,
            Description: description,
            IsPublic: isPublic,
            OwnerID: user.username 
        };

        // Send a POST request to the /datasets/ endpoint using Axios
        axios.post('http://localhost:8000/apis/datasets', dataset)
            .then(response => {
                console.log(response.data);
                setOpen(false); 
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create Dataset</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please fill out the information below to create a new dataset.
                </DialogContentText>
                <form className="newDatasetForm" onSubmit={handleCreateDataset}>
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
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleCreateDataset} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};


