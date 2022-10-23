import React, { useContext, useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  query,
  remove,
  update,
} from "firebase/database";

import { useAuth } from "../context/AuthContextProvider";

const BlogContext = React.createContext();

export function useBlog() {
  return useContext(BlogContext);
}

const BlogProvider = ({ children }) => {
  const [currentBlogs, setCurrentBlogs] = useState();

  function addBlog(newBlog, currentUser) {
    // const { currentUser } = useAuth();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log(
      newBlog.title,
      newBlog.content,
      newBlog.image,
      newBlog.published_date,
      newBlog.author,
      newBlog.status
    );
    console.log(currentUser);
    const raw = JSON.stringify({
      title: newBlog.title,
      content: newBlog.content,
      //image: newBlog.image,
      //published_date: newBlog.published_date,
      //last_updated: newBlog.last_updated,
      //status: newBlog.status,
      //slug: newBlog.slug,
      author: newBlog.id,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/bloglist/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        getContacts();
      })
      .catch((error) => console.log("error", error));

    // const db = getDatabase();
    // const userRef = ref(db, "bloglar");
    // const newUserRef = push(userRef);
    // set(newUserRef, newBlog);
  }

  function deleteOneBlog(id) {
    fetch("http://127.0.0.1:8000/bloglist/" + id + "/", { method: "DELETE" })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        getContacts();
      })
      .catch((error) => console.log("error", error));

    // const db = getDatabase();
    // // const userRef = ref(db, 'blogs');
    // remove(ref(db, "bloglar/" + id));
  }

  function updateBlog(id, data) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: id,
      title: data.title,
      content: data.content,
      image: data.image,
      published_date: data.published_date,
      last_updated: data.last_updated,
      status: data.status,
      slug: data.slug,
      author: data.author,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/bloglist/" + id + "/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        getContacts();
      })
      .catch((error) => console.log("error", error));

    // const db = getDatabase();
    // // const newUserKey=push(child(ref(db),"blogs/")).key;
    // const updates = {};
    // updates["bloglar/" + id] = data;
    // return update(ref(db), updates);
  }

  const getContacts = () => {
    fetch("http://127.0.0.1:8000/bloglist/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCurrentBlogs(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getContacts();
    // const db = getDatabase();
    // const blogRef = ref(db, "bloglar");
    // onValue(query(blogRef), (snapshot) => {
    //   // console.log(snapshot.val());
    //   const blogs = snapshot.val();
    //   const blogL = [];
    //   for (let id in blogs) {
    //     blogL.push({ id, ...blogs[id] });
    //   }
    //   //   console.log(blogL);
    //   setCurrentBlogs(blogL);
    // });
  }, []);

  function getOneBlog(id) {
    const result = currentBlogs?.filter((item) => item.id === id);
    return result;
  }

  const value = {
    addBlog,
    currentBlogs,
    getOneBlog,
    deleteOneBlog,
    updateBlog,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
export default BlogProvider;
