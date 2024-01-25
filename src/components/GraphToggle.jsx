import React from "react";
import { Box, Typography } from "@mui/material";

import StyledSwitch from "../styled_components/StyledSwitch";

const styles = {
    box: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100px",
        height: "60px",
        padding: "10px",
        margin: "10px",
        position: "absolute",
        bottom: "10px",
        right: "10px",
        gap: "5px"
    },
};

const GraphToggle = ({ isGraph3D, setIsGraph3D }) => {
    return (
        <Box style={ styles.box }>
            <Typography color={"white"}>{isGraph3D ? '3D' : '2D'}</Typography>
            <StyledSwitch checked={isGraph3D} onChange={() => setIsGraph3D(!isGraph3D)}/>
        </Box>
    );
};

export default GraphToggle;
