import React from "react";
import Home from "../pages/Home";
import AddForm from "../pages/AddForm";
import Read from "../pages/Read";
import Log from "../pages/Log";
import type { pageData } from "../types/pageData";

const pagesData : pageData[] = [
  {
    path: "",
    element: <Home />,
    title: "home"
  },
  {
    path: "/add",
    element: <AddForm />,
    title: "Add a Book"
  },
  {
    path: "/log",
    element: <Log />,
    title: "View Your Reading Log"
  },
  {
    path: "/read",
    element: <Read />,
    title: "Read a Book"
  },
  {
    path: "*",
    element: <Home />,
    title: "home"
  }
];

export default pagesData;
