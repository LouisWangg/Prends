import React from "react";
import { Box, Typography } from "@mui/material";

const HomeSection = ({ title, subTitle, children, columns, style = {} }) => {
    return (
        <div style={{ margin: "40px", ...style }}>
            <Typography variant="h4">{title}</Typography>
            <Typography variant="body1" style={{ margin: "10px 0 20px 0" }}>
                {subTitle}
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: 3
                }}
            >
                {children}
            </Box>
        </div>
    );
};

export default HomeSection;
