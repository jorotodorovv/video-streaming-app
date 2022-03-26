import { Grid } from "@mui/material";

import CircularImage from "../base/CircularImage/CircularImage"

const VideoChannel = (props) => {

    return (
        <Grid item xs={1}>
            <CircularImage image={props.image} height={80} width={80} />
        </Grid>
    );
};

export default VideoChannel;