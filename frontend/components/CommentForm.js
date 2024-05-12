import axios from 'axios';
import { Button, TextField } from '@mui/material'; // Using Material UI for styling

const CommentForm = () => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment) return;

    try {
      await axios.post('http://localhost:8000/apis/comments', { comment });
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Write your comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        multiline
      />
      <Button variant="contained" type="submit">
        Comment
      </Button>
    </form>
  );
};

export default CommentForm;