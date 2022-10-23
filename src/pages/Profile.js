import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../context/AuthContextProvider";
import { Card, CardContent, Typography } from "@mui/material";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 500,
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 25,
  },

  title: {
    fontFamily: "Girassol",
    textAlign: "center",
    margin: 20,
    color: "#046582",
  },
  pos: {
    marginBottom: 12,
    color: "#046582",
  },
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 500,
    marginTop: 100,
  },
  image: {
    borderRadius: "50%",
    width: "100px",
  },
  mainS: {
    justifyContent: "center",
    height: "100vh",
    backgroundImage: "url(https://picsum.photos/1600/900)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    paddingTop: "40px",
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  const { currentUser } = useAuth();
  console.log(currentUser);

  return (
    <div className={classes.mainS}>
      <Typography className={classes.title} variant="h3" noWrap>
        ──── Profile ────
      </Typography>
      <div className={classes.mainDiv}>
        <Card className={classes.root}>
          <img
            src={currentUser?.photoURL || "../assets/placeholder.png"}
            className={classes.image}
            alt="profile"
          />
          <CardContent>
            <Typography
              className={classes.pos}
              color="textSecondary"
              gutterBottom
            >
              Display Name :
            </Typography>
            <Typography variant="h5" component="h2">
              {currentUser?.displayName || "Not Found!"}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Email :
            </Typography>
            <Typography variant="body2" component="p">
              {currentUser?.email || "Not Found!"}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
