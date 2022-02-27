import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RecommendOutlinedIcon from '@mui/icons-material/RecommendOutlined';

import VideoParagraph from "../VideoParagraph/VideoParagraph";

const DESCRIPTION_PARAGRAPH_SEPARATOR = "\n";

const VideoDescription = (props) => {
    let description = null;

    if (props.description) {
        description = props.description.split(DESCRIPTION_PARAGRAPH_SEPARATOR)
            .map(p => <VideoParagraph text={p} onChangeTime={props.onChangeTime} />);
    }

    return (
        <Accordion sx={{ p: 2 }}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon fontSize="large" />}>
                <Typography variant="h4">{props.title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pr: 50 }}>
                <Typography variant="h4" color="secondary">
                    {props.likes}<RecommendOutlinedIcon fontSize="large" />
                </Typography>
                {description}
            </AccordionDetails>
        </Accordion>
    );
};

export default VideoDescription;