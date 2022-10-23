import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import NewBlog from "../pages/NewBlog";
import UpdateBlog from "../pages/UpdateBlog";
import Detail from "../pages/Detail";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />

        <Route element={<PrivateRouter />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/newblog" element={<NewBlog />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/update/:id" element={<UpdateBlog />} />
        </Route>
        <Route element={<PrivateRouter />}>
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
