import React from "react";
import { Box, Typography } from "@mui/material";
import "./CommentBox.css";

const CommentBox = ({ data }) => {
    const comment = data;
    return (
        <Box className="commentBox">
            <Typography variant="h5" style={{ marginBottom: "10px" }}>{comment.title}</Typography>
            <Typography variant="subtitle1" style={{ textAlign: "justify"}}>{comment.description}</Typography>
        </Box>
    );
};

export default CommentBox;
