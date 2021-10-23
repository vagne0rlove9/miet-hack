import React from 'react';
import { grey } from '@mui/material/colors';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

import './ControlPanel.css';

const ControlPanel = ({
    page,
    maxPage,
    changePageHandler,
    clickForward,
    clickBack,
    clickFirstPage,
    clickLastPage,
    isEnableForward,
    isEnableBack,
    isEnableFirst,
    isEnableLast
}) => {
    return (
        <div className="control-panel">
            <FirstPageIcon
                sx={{ color: grey[600] }}
                onClick={clickFirstPage}
                className={isEnableFirst ? "control-panel__item--disabled" : "control-panel__item"}
            />
            <KeyboardArrowLeftIcon
                sx={{ color: grey[600] }}
                onClick={clickBack}
                className="control-panel__item"
            />
            <input
                className="control-panel__page"
                value={page ? page : ''}
                onChange={changePageHandler}
            />
            &nbsp;/ {maxPage}
            <KeyboardArrowRightIcon
                sx={{ color: grey[600] }}
                onClick={clickForward}
                className="control-panel__item"
            />
            <LastPageIcon
                sx={{ color: grey[600] }}
                onClick={clickLastPage}
                className="control-panel__item"
            />
            <ZoomInIcon
                sx={{ color: grey[600] }}
                className="control-panel__item control-panel__item--margin"
            />
            <ZoomOutIcon sx={{ color: grey[600] }} className="control-panel__item" />
        </div>
    )
}

export default ControlPanel;
