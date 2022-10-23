import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import placeholder from "../assets/placeholder.png";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAuth } from "../context/AuthContextProvider";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { AccountCircle } from "@mui/icons-material";

const useStyles = makeStyles({
  root: {
    minWidth: 345,
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  module: {
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    "text-overflow": "ellipsis",
    overflow: "hidden",
  },
  image: {
    padding: 3,
  },
  avatar: {
    marginBottom: "0.35em",
  },
  cardContent: {
    backgroundColor: "#efeefe",
    height: "125px",
  },
  title: {
    fontFamily: "Girassol",
    color: "#046582",
  },
});

export default function MediaCard({ post }) {
  const {
    id,
    author,
    content,
    comment_count,
    like_count,
    postview_count,
    image,
    published_date,
    title,
  } = post;
  const classes = useStyles();
  const navigate = useNavigate();
  const { currentUser, toastErrorNotify } = useAuth();

  const openDetails = () => {
    if (!currentUser) {
      toastErrorNotify("Login for detials of blog!");
    }
    navigate(`/detail/${id}`);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={openDetails}>
        <CardMedia
          className={classes.media}
          image={image || placeholder}
          title={title}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {moment(published_date).format("MMM DD, YYYY")}
          </Typography>
          <p className={classes.module}>{content}</p>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <AccountCircle className={classes.avatar} />
        <Typography gutterBottom variant="h6" component="h2">
          {author}
        </Typography>
      </CardActions>
      <CardActions>
        <IconButton aria-label="add to favorites" className={classes.image}>
          <FavoriteIcon color={like_count > 0 ? "secondary" : "disabled"} />
        </IconButton>
        <Typography variant="body2" color="textSecondary">
          {like_count}
        </Typography>
        <IconButton aria-label="comment count" className={classes.image}>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Typography variant="body2" color="textSecondary">
          {comment_count}
        </Typography>
        <IconButton aria-label="comment count" className={classes.image}>
          <VisibilityIcon />
        </IconButton>
        <Typography variant="body2" color="textSecondary">
          {postview_count}
        </Typography>
      </CardActions>
    </Card>
  );
}
