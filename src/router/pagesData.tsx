import React from "react";
import Home from "../pages/Home";
import type { pageData } from "../types/pageData";

const pagesData = [
  {
    path: "",
    element: <Home />,
    title: "home"
  },
  {
    path: "*",
    element: <Home />,
    title: "home"
  }
];

export default pagesData;
