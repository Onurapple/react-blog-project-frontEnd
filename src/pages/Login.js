import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import blok from "../assets/blok.png";
import { Box, TextField } from "@mui/material";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContextProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  /* const [email, setEmail] = useState();
  const [password, setPassword] = useState(); */
  const navigate = useNavigate();
  const {
    setCurrentUser,
    currentUser,
    loginWithGoogle,
    toastSuccessNotify,
    toastErrorNotify,
    login,
    displayName,
  } = useAuth();

  const handleGoogleProvider = () => {
    loginWithGoogle(navigate, setCurrentUser, toastSuccessNotify);
    toastSuccessNotify("Login Successfully performed!");
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is Required"),
    password: Yup.string("Enter your password")
      .min(6, "Password min length should be 6")
      .required("Password is Required"),
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: "url(https://picsum.photos/1600/900)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        paddingTop: "40px",
      }}
    >
      <Card
        sx={{
          maxWidth: 545,
          borderRadius: "10px",
          boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75);",
          height: "fit-content",
          maxWidth: "500px",
          padding: "20px",
        }}
      >
        <CardMedia
          component="img"
          alt="blok"
          image={blok}
          sx={{
            backgroundColor: "#046582",
            borderRadius: "50%",
            padding: "20px",
            margin: "auto",
            width: "35%",
            height: "35%",
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h1"
            sx={{
              fontFamily: "Girassol",
              fontSize: "24px",
              color: "#046582",
              textAlign: "center",
            }}
          >
            ── Login ──
          </Typography>

          <div>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
                termsAndConditions: false,
              }}
              validationSchema={SignupSchema}
              onSubmit={(values, actions) => {
                console.log(values);
                console.log(actions);
                login(
                  values.email,
                  values.password,
                  setCurrentUser,
                  currentUser,
                  displayName
                )
                  .then(() => {
                    toastSuccessNotify("Login Successfully.");
                    navigate("/");
                    actions.setSubmitting(false);
                  })
                  .catch((error) => {
                    toastErrorNotify(error.message);
                    actions.setSubmitting(false);
                    actions.resetForm();
                  });
              }}
            >
              {(actions) => (
                <Form>
                  <Box
                    component="form"
                    sx={{
                      "& .MuiTextField-root": { width: "100%", my: "10px" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <Field
                        as={TextField}
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        placeholder="Email"
                        helperText={<ErrorMessage name="email" />}
                      />
                      <Field
                        as={TextField}
                        fullWidth
                        id="outlined-password-input"
                        name="password"
                        label="Password"
                        type="password"
                        helperText={<ErrorMessage name="password" />}
                      />
                    </div>
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      marginY: "10px",
                    }}
                    type="submit"
                    disabled={actions.isSubmitting}
                  >
                    {actions.isSubmitting ? "LOADING" : "LOGIN"}
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      marginBottom: "30px",
                    }}
                    onClick={handleGoogleProvider}
                  >
                    WITH{" "}
                    <img
                      src={google}
                      style={{ marginLeft: "10px", width: "60px" }}
                    ></img>
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
