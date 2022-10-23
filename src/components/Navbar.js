import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import mylogo from "../assets/mylogo.png";
import { useAuth } from "../context/AuthContextProvider";
import { Link } from "react-router-dom";
/* import { logOut } from "../utils/firebaseUtils"; */
import "react-toastify/dist/ReactToastify.css";

/* import { logOut } from '../utils/firebaseUtils'; */

/* const toastSuccessNotify = (msg) => {
  toast.success(msg, {
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}; */

export default function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  let {
    currentUser,
    setCurrentUser,
    toastSuccessNotify,
    logOut,
    signup,
    login,
  } = useAuth();

  /* currentUser = {
    email: "test@gmail.com",
  }; */

  /* const toastErrorNotify = (msg) => {
    toast.error(msg, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }; */

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogin = () => {
    login();
    // setAnchorEl(null);
  };
  const handleRegister = () => {
    signup();
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logOut();
    toastSuccessNotify("Logout Successful");
    setCurrentUser(false);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#046582",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <img
                  style={{ height: "50px", width: "80px" }}
                  src={mylogo}
                  alt="OnurLogo"
                />
              </IconButton>
            </Link>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontFamily: "Girassol",
                  /* display: "flex", */
                  /* display: { xs: "block", md: "none" }, */
                  flexGrow: 1,
                  color: "orange",
                  fontSize: "1.5rem",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  display: { xs: "none", md: "flex" },
                }}
              >
                {"──<Onur's/>"}
                <span
                  style={{
                    fontFamily: "Girassol",
                    fontWeight: "bold",
                    color: "wheat",
                    fontSize: "1.5rem",
                  }}
                >
                  {"Blog──"}
                </span>
              </Typography>
            </Link>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </IconButton>
              {currentUser ? (
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link
                    to="/profile"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                  </Link>
                  <Link
                    to="/newblog"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleClose}>New Blog</MenuItem>
                  </Link>
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleLogout();
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Link>
                </Menu>
              ) : (
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleLogin}>Login</MenuItem>
                  </Link>
                  <Link
                    to="/register"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleRegister}>Register</MenuItem>
                  </Link>
                </Menu>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
