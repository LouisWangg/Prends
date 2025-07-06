import React, {  } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import "./ListPage.css";

const ListPage = () => {
  const { type } = useParams();

  let pageTitle, pageDescription;
  if (type.includes("service")) {

  } else if (type.includes("class")) {

  } else if (type.includes("counselor")) {

  }

  return (
    <div className="pageWrapper">
            <Typography variant="h4">{pageTitle}</Typography>
            <Typography variant="body1" style={{ margin: "10px 0 20px 0" }}>
                {pageDescription}
            </Typography>
    </div>
  );
};

export default ListPage;
