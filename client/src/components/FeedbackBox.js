import React from "react";
import { Box, Typography } from "@mui/material";
import "./FeedbackBox.css";

const FeedbackBox = ({ data }) => {
    const feedback = data;
    return (
        <Box className="feedbackBox">
            <Typography variant="h5" style={{ marginBottom: "10px" }}>{feedback.title}</Typography>
            <Typography variant="subtitle1" style={{ textAlign: "justify"}}>{feedback.description}</Typography>
        </Box>
    );
};

export default FeedbackBox;
