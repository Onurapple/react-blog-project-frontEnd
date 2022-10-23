import React from "react";
import placeholder from "../assets/placeholder.png";
import moment from "moment";
import { useBlog } from "../context/BlogContextProvider";
import { useAuth } from "../context/AuthContextProvider";
import loadingGif from "../assets/loading.gif";
import { useNavigate, useParams } from "react-router-dom";
import noData from "../assets/no-data.png";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AccountCircle } from "@mui/icons-material";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 70,
    marginBottom: 20,
  },
  cardRoot: {
    minWidth: 250,
    width: "75vw",
    // maxWidth: 700,
  },
  media: {
    // minHeight: "30vh",
    height: "0",
    paddingTop: "56.25%", // 16:9
  },
  image: {
    padding: 3,
  },
  avatar: {
    marginBottom: "0.35em",
  },
  cardContent: {
    backgroundColor: "#efeefe",
    minHeight: "200px",
  },
  title: {
    fontFamily: "Girassol",
    textAlign: "center",
    margin: 20,
    color: "#046582",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    margin: 20,
  },
  dataStyle: {
    textAlign: "center",
  },
});

export default function Details() {
  const classes = useStyles();
  const { getOneBlog, deleteOneBlog } = useBlog();
  const { currentUser, toastSuccessNotify } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const result = getOneBlog(Number(id));
  console.log(typeof id);
  console.log(result);

  const deleteHandler = (id) => {
    console.log("DeleteHandler", id);
    deleteOneBlog(id);
    navigate("/");
    toastSuccessNotify("Deleted successfully!");
  };

  const updateHandler = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h3" noWrap>
        ──── Details ────
      </Typography>
      {result?.length > 0 ? (
        result?.map((item, index) => (
          <div key={index}>
            <Card className={classes.cardRoot} key={index}>
              <div>
                <CardMedia
                  className={classes.media}
                  image={item.image || placeholder}
                  title={item.title}
                />
                <CardContent className={classes.cardContent}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className={classes.title}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.dataStyle}
                  >
                    {moment(item.published_date).format("MMM DD, YYYY")}
                  </Typography>
                  <p>{item.content}</p>
                </CardContent>
              </div>
              <CardActions>
                <AccountCircle className={classes.avatar} />
                <Typography gutterBottom variant="h6" component="h2">
                  {item.author}
                </Typography>
              </CardActions>
              <CardActions>
                <IconButton
                  aria-label="add to favorites"
                  className={classes.image}
                >
                  <FavoriteIcon
                    color={item.like_count > 0 ? "secondary" : "disabled"}
                  />
                </IconButton>
                <Typography variant="body2" color="textSecondary">
                  {item.like_count}
                </Typography>
                <IconButton
                  aria-label="comment count"
                  className={classes.image}
                >
                  <ChatBubbleOutlineIcon />
                </IconButton>
                <Typography variant="body2" color="textSecondary">
                  {item.comment_count}
                </Typography>

                <IconButton
                  aria-label="comment count"
                  className={classes.image}
                >
                  <VisibilityIcon />
                </IconButton>
                <Typography variant="body2" color="textSecondary">
                  {item.postview_count}
                </Typography>
              </CardActions>
            </Card>
            {item.author === currentUser?.email ? (
              <div className={classes.buttonGroup}>
                <Button
                  variant="contained"
                  onClick={() => updateHandler(item.id)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteHandler(item.id)}
                >
                  Delete
                </Button>
              </div>
            ) : null}
          </div>
        ))
      ) : result === undefined ? (
        <img src={loadingGif} alt="loading" />
      ) : (
        <>
          <img src={noData} alt="no data" />
        </>
      )}
    </div>
  );
}
