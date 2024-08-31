import React from "react";
import Home from "../pages/Home";
import AddForm from "../pages/AddForm";
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
    path: "*",
    element: <Home />,
    title: "home"
  }
];

export default pagesData;
