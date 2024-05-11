import axios from 'axios';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material'; // Using Material UI for styling

const CommentSection = () => {
  const [comments, setComments] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get('http://localhost:8000/apis/datasetcomments/');
//       setComments(response.data);
//     };

//     fetchData();
//   }, []);

  useEffect(() => {
    axios.get('http://localhost:8000/apis/datasetcomments/')
        .then(response => {
            const comments = response.data;
            // Fetch usernames for each comments
            const userPromises = comments.map(commment => 
                axios.get(`http://localhost:8000/apis/users/${comment.AuthorID}`)
            );
            return Promise.all([comments, ...userPromises]);
        })
        .then(([comments, ...userResponses]) => {
            // Add username to each comment
            const commentsWithUsernames = comments.map((comment, index) => ({
                ...comment,
                userName: userResponses[index].data.Username
            }));
            setComments(commentsWithUsernames);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
 }, []);

  return (
    <div style={{ height: '25vh', overflowY: 'scroll', position: 'fixed', bottom: 0, width: '100%' }}>
      <List dense>
        {comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemAvatar>
              <Avatar src={comment.ProfiePicturePath} />
            </ListItemAvatar>
            <ListItemText primary={comment.AuthorName} secondary={comment.Comment} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CommentSection;