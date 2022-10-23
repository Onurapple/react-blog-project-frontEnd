import React from "react";

import BlogCard from "../components/BlogCard";
import { useBlog } from "../context/BlogContextProvider";
import Typography from "@mui/material/Typography";
import loadingGif from "../assets/loading.gif";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(5),
      marginTop: 70,
    },
  },

  title: {
    fontFamily: "Girassol",
    textAlign: "center",
    color: "#046582",
  },
  mainRoot: {
    marginTop: 30,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { currentBlogs } = useBlog();

  return (
    <div className={classes.mainRoot}>
      <Typography
        className={classes.title}
        style={{ fontFamily: "Girassol" }}
        variant="h3"
        noWrap
      >
        ──── Dashboard ────
      </Typography>
      <div className={classes.mainRoot}>
        <Grid container className={classes.root} spacing={5} justify="center">
          <Grid item xs={12}>
            <Grid container justifyContent={"center"} spacing={5}>
              {currentBlogs === undefined ? (
                <img src={loadingGif} alt="loading" />
              ) : currentBlogs ? (
                currentBlogs?.map((item, id) => (
                  <Grid key={id} item>
                    <BlogCard post={item} />
                  </Grid>
                ))
              ) : (
                <h3>No data available.</h3>
              )}
            </Grid>
          </Grid>
        </Grid>
        {/* <Box
          display="flex"
          justifyContent="center"
          m={1}
          p={1}
          bgcolor="background.paper"
        >
          <Box p={1}>
            {hasNext ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => loadMore()}
              >
                View More
              </Button>
            ) : null}
          </Box>
        </Box> */}
      </div>
    </div>
  );
};

export default Dashboard;
