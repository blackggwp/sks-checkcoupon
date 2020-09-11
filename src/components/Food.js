import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { cartSelector, addItemToDB, saveUserID } from '../slices/cart'
import { useCookies } from 'react-cookie'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Grid } from '@material-ui/core';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    // paddingTop: '56.25%', // 16:9
    padding: '50%',

  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const dispatch = useDispatch()
  const { userID } = useSelector(cartSelector);
  const [cookies] = useCookies(['name']);

  const classes = useStyles();

  return (
    <Grid item key={props.row.rowid} xs={6} sm={6} md={3}>
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={props.img}
        title={props.row.fname}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          {props.row.fname}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.row.fprice}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          color="primary"
          className={clsx(classes.expand)}
          onClick={() => {
            dispatch(addItemToDB(props.row))
            userID === '' && dispatch(saveUserID(cookies.userid))
          }}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
    </Grid>
  );
}
