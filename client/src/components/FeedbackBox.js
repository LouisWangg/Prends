import React from "react";
import { Box, Typography } from "@mui/material";
import "./FeedbackBox.css";

const FeedbackBox = ({ data }) => {
    const feedback = data;
    return (
        <Box className="feedbackBox">
            <Typography>{feedback.title}</Typography>
            <Typography>This is : {feedback.description}</Typography>
        </Box>
    );
};

export default FeedbackBox;
