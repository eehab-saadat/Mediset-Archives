import Head from 'next/head';
import Layout, { siteTitle } from './layout';
import utilStyles from '../styles/utils.module.css';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardComponent({name, description, userName, votesCount, image}) {
  return(
  <Card sx={{ maxWidth: 345 }}>
  <CardMedia
    sx={{ height: 140}}
    image={image}
    title={name}
  />
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
      {name}
    </Typography>
    <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">Learn More</Button>
      <Typography variant="body2" color="text.secondary">
        Votes: {votesCount}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Uploaded by: {userName}
      </Typography>
    </CardActions>
  </Card>
  );
}


































// export default function CardComponent({name, description, userName, votesCount, image}) {
//     return(
//     <Card sx={{ maxWidth: 345 }}>
//     <CardMedia
//       sx={{ height: 140}}
//       image={image}
//       title="green iguana"
//     />
//     <CardContent>
//       <Typography gutterBottom variant="h5" component="div">
//         {name}
//       </Typography>
//       <Typography variant="body2" color="text.secondary">
//         {description}
//       </Typography>
//     </CardContent>

//     <CardActions>
//       <Button size="small">Upvote</Button>
//       <Typography variant="body2" color="text.secondary">
//         {votesCount}
//       </Typography>
//       <Button size="small">Downvote</Button>
//     </CardActions>
//   </Card>
//     );
// }