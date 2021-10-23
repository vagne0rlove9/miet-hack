import React from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ControlPanel = ({page, maxPage}) => {
    return (
        <div className="control-panel">
            <ArrowBackIosNewIcon />
            <ArrowForwardIosIcon />
        </div>
    )
}

export default ControlPanel;
