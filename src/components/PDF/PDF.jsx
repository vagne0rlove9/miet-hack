import React, { useState, useCallback } from "react";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useDropzone } from 'react-dropzone';
import ControlPanel from "../ControlPanel/ControlPanel";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { pink } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

import './PDF.css';

const PDF = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(null);
    const [file, setFile] = useState([]);
    const [isEnableForward, setEnableForward] = useState(false);
    const [isEnableBack, setEnableBack] = useState(true);
    const [isEnableFirst, setEnableFirst] = useState(true);
    const [isEnableLast, setEnableLast] = useState(false);

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles);
        setPageNumber(1);
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const deleteHandler = event => {
        event.stopPropagation();
        setFile([]);
        setNumPages(null);
    }

    const changePageHandler = event => {
        if(!pageNumber) {
            return;
        }
        if (Number.isInteger(+event.target.value)) {
            setPageNumber(+event.target.value);
        }
    }

    const clickForwardHandler = () => {
        if(!pageNumber || pageNumber === numPages) {
            setEnableForward(true);
            return;
        }
        if (pageNumber !== numPages) {
            setPageNumber(prev => prev + 1);
        }
    }

    const clickBackHandler = () => {
        if(!pageNumber || pageNumber === 1) {
            setEnableBack(true);
            return;
        }
        if (pageNumber !== 1) {
            setPageNumber(prev => prev - 1);
        }
    }

    const clickFirstHandler = () => {
        if(!pageNumber || pageNumber === 1) {
            setEnableFirst(true);
            return;
        }
        setPageNumber(1);
    }

    const clickLastHandler = () => {
        if(!pageNumber || pageNumber === numPages) {
            setEnableBack(true);
            return;
        }
        setPageNumber(numPages);
    }

    return (
        <div>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} className="dropzone__input" />
                {
                    file.length === 0 ?
                        isDragActive ?
                        <Typography variant="body1" gutterBottom>Перетащите файл сюда ...</Typography>
                        :
                        <Typography variant="body1" gutterBottom>
                            Перетащите файл сюда или нажмите и выберете файл
                        </Typography>
                        : (
                            <span className="dropzone__input-name">
                                {file[0].name}
                                <DeleteForeverIcon
                                    sx={{ color: pink[500] }}
                                    onClick={deleteHandler}
                                />
                            </span>
                        )
                }
            </div>
            <ControlPanel
                page={pageNumber}
                maxPage={numPages}
                changePageHandler={changePageHandler}
                clickForward={clickForwardHandler}
                clickBack={clickBackHandler}
                clickFirstPage={clickFirstHandler}
                clickLastPage={clickLastHandler}
                isEnableForward={isEnableForward}
                isEnableBack={isEnableBack}
                isEnableFirst={isEnableFirst}
                isEnableLast={isEnableLast}
            />
            {
                file.length !== 0 ?
                    <Document file={file.length !== 0 ? file[0] : null} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} className="page" />
                    </Document>
                    :
                    <Typography className="text-container" variant="h6" gutterBottom component="div">
                        Файл не выбран
                    </Typography>
            }
        </div>
    );
};

export default PDF;
