import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, TextField, Paper, Grid, Box } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';
import TableView from '../components/TableView';

const MotionButton = motion(Button);
const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);

export default function HomePage() {
  const [dataset, setDataset] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [datasetTags, setDatasetTags] = useState([]);
  const [newComment, setNewComment] = useState('');
  const filepath = '/storage/data.csv';
  const [voteCount, setVoteCount] = useState(0);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const fetchDataset = async () => {
      try {
        const response = await axios.get('http://localhost:8000/apis/datasets/1');
        setDataset(response.data);
        setVoteCount(response.data.VoteCount);
      } catch (error) {
        console.error('Error fetching dataset:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/apis/users/1');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    const fetchDatasetTags = async () => {
      try {
        const response = await axios.get('http://localhost:8000/apis/tags/1');
        setDatasetTags(response.data);
      } catch (error) {
        console.error('Error fetching dataset tags:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/apis/datasetcomments/');
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchUser();
    fetchDataset();
    fetchComments();
    fetchDatasetTags();
  }, []);

  const handleUpvote = () => {
    if (!voted) {
      setVoteCount(voteCount + 1);
      setVoted(true);
    }
  };

  const handleDownvote = () => {
    if (!voted) {
      setVoteCount(voteCount - 1);
      setVoted(true);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/apis/datasetcomments/DatasetID=${dataset.DatasetID}`, {
        Comment: newComment,
        CommentedBy: user.UserID,
      });
      setNewComment('');
      setComments([...comments, response.data]);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}
    >
      <Container maxWidth="lg" style={{ paddingLeft: '10%', paddingRight: '10%' }}>
        <MotionPaper
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#EA9AB2', borderRadius: '10px', border: '1px solid #e0e0e0' }}
        >
          <Typography variant="h4" gutterBottom style={{ paddingTop: '100px' }}>
            {dataset ? dataset.Name : 'Loading...'}
          </Typography>
          <Typography variant="body1">
            {dataset ? dataset.Description : 'Loading...'}
          </Typography>
        </MotionPaper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <MotionPaper
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#87CEEB', borderRadius: '10px', border: '1px solid #e0e0e0' }}
            >
              <a href="/storage/data.csv" download>
                  <MotionButton
                    variant="contained"
                    color="primary"
                    style={{ marginRight: '20px', backgroundColor: '#9292fc', color: 'white' }}
                    whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Download Dataset  <small>.csv</small>
                  </MotionButton>
               </a>
              <MotionButton
                variant="contained"
                color="primary"
                style={{ backgroundColor: '#9292fc', color: 'white' }}
                whileHover={{ scale: 1.1, boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)' }}
                whileTap={{ scale: 0.9 }}
              >
                Edit Dataset
              </MotionButton>
            </MotionPaper>
            <MotionPaper
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '20px',
                marginBottom: '20px',
                backgroundColor: '#87CEEB',
                borderRadius: '10px',
                border: '1px solid #e0e0e0'
              }}
            >
              <MotionButton
                variant="contained"
                style={{ color: voted ? '#9292fc' : '#FFFFFF', marginRight: '10px', backgroundColor: voted ? '#EA9AB2' : '#FFFFFF' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleUpvote}
              >
                <ThumbUpIcon />
              </MotionButton>
              <MotionTypography
                variant="h4"
                style={{ marginRight: '10px' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {voteCount}
              </MotionTypography>
              <MotionButton
                variant="contained"
                style={{ color: voted ? '#9292fc' : '#FFFFFF', marginLeft: '10px', backgroundColor: voted ? '#EA9AB2' : '#FFFFFF' }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDownvote}
              >
                <ThumbDownIcon />
              </MotionButton>
            </MotionPaper>
            <MotionPaper
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#87CEEB', borderRadius: '10px', border: '1px solid #e0e0e0' }}
            >
              <Typography variant="h6" gutterBottom>
                Comments
              </Typography>
              <div style={{ marginBottom: '20px' }}>
                {comments.map((comment) => (
                  <MotionPaper
                    key={comment.CommentID}
                    style={{ padding: '10px', marginBottom: '10px', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #e0e0e0' }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Typography variant="body1">{comment.Comment} - {comment.CommentedBy}</Typography>
                    <ExpandMoreIcon />
                  </MotionPaper>
                ))}
              </div>
              <form onSubmit={handleCommentSubmit}>
                <TextField
                  label="Enter your comment"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  style={{ marginBottom: '20px' }}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <MotionButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: '#9292fc', color: 'white' }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Upload Comment
                </MotionButton>
              </form>
            </MotionPaper>
          </Grid>
          <Grid item xs={12} md={4}>
            <MotionPaper
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              style={{ padding: '20px', marginBottom: '20px', backgroundColor: '#87CEEB', borderRadius: '10px', border: '1px solid #e0e0e0' }}
            >
              <Typography variant="h6">Metadata</Typography>
              <Typography variant="body1" style={{ marginBottom: '10px' }}>Created By: {user ? `${user.FName} ${user.LName}` : 'Loading...'}</Typography>
              <Typography variant="body1" style={{ marginBottom: '10px' }}>Created At: {dataset ? new Date(dataset.CreatedAt).toLocaleString() : 'Loading...'}</Typography>
              <Typography variant="body1" style={{ marginBottom: '10px' }}>Download Count: {dataset ? dataset.DownloadCount : 'Loading...'}</Typography>
              <Typography variant="body1" style={{ marginBottom: '10px' }}>Dataset Tags: {datasetTags.Name}</Typography>
            </MotionPaper>
          </Grid>
        </Grid>
        <Box>
          <TableView filepath={filepath} />
        </Box>
      </Container>
    </motion.div>
  );
}
