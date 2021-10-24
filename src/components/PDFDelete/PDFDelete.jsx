import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ControlPanel from '../ControlPanel/ControlPanel';
import Dropzone from '../Dropzone/Dropzone';
import Typography from '@mui/material/Typography';

import './PDFDelete.css';

axios.defaults.baseURL = 'http://localhost:8080/';

const PDFDelete = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [file, setFile] = useState([]);
    const ref = useRef(null);

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles);
        setPageNumber(1);
    }, [])

    useEffect(() => {
        if (ref.current.offsetWidth < 400) {
            setZoom(0.4);
        }
    }, [ref])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);

        var formData = new FormData();
        formData.append("file", file[0]);
        axios.post('/v1/pdfs/rotate/all', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    const click = () => {
        var formData = new FormData();
        formData.append("file", file[0]);
        formData.append("instructionPageRange", '1-5');
        axios.post('/v1/pdfs/rotate/all', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => {
            const file = new Blob(
                [response.data],
                { type: 'application/pdf' });
            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);
            //Open the URL on new Window
            window.open(fileURL);
        });
    }

    const deleteHandler = event => {
        event.stopPropagation();
        setFile([]);
        setPageNumber(null);
    }

    const changePageHandler = event => {
        if (!pageNumber) {
            return;
        }
        if (Number.isInteger(+event.target.value)) {
            setPageNumber(+event.target.value);
        }
    }

    const clickForwardHandler = () => {
        if (!pageNumber || pageNumber === numPages) {
            return;
        }
        if (pageNumber !== numPages) {
            setPageNumber(prev => prev + 1);
        }
    }

    const clickBackHandler = () => {
        if (!pageNumber || pageNumber === 1) {
            return;
        }
        if (pageNumber !== 1) {
            setPageNumber(prev => prev - 1);
        }
    }

    const clickFirstHandler = () => {
        if (!pageNumber || pageNumber === 1) {
            return;
        }
        setPageNumber(1);
    }

    const clickLastHandler = () => {
        if (!pageNumber || pageNumber === numPages) {
            return;
        }
        setPageNumber(numPages);
    }

    const changeZoomHandler = (event, type) => {
        if (type === '+') {
            if (Math.round(zoom) >= 0 && Math.round(zoom) <= 2) {
                setZoom(prev => prev + 0.1);
            }
        }
        if (type === '-') {
            if (Math.round(zoom) >= 1 && Math.round(zoom) <= 3) {
                setZoom(prev => prev - 0.1);
            }
        }
    }

    return (
        <div ref={ref}>
            <Typography
                variant="h3"
                gutterBottom
                component="div"
                style={{ margin: 16, textAlign: 'center' }}
            >
                Удалить страницы из PDF файла
            </Typography>
            <Typography
                variant="body1"
                gutterBottom
                component="div"
                style={{
                    marginBottom: 48,
                    textAlign: 'center',
                    color: '#79797A',
                    fontSize: 16,
                    fontWeight: 100
                }}
            >
                Укажите номера страниц, которые необходимо удалить, и получите новый PDF файл без указанных страниц
            </Typography>
            <Dropzone
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                isDragActive={isDragActive}
                file={file}
                deleteHandler={deleteHandler}
            />
            <div className="center">
                <FormControl component="fieldset" className="form" style={{
                    padding: 20,
                    boxSizing: 'border-box'
                }}>
                    <RadioGroup
                        aria-label="type"
                        defaultValue="all"
                        name="radio-buttons-group"
                    >
                        <div>
                            <FormControlLabel value="pages" control={<Radio />} label="Номера страниц" />
                            <input className="form__input" placeholder="Например: 1, 2-5" />
                        </div>
                        <FormControlLabel value="all" control={<Radio />} label="Весь документ" />
                    </RadioGroup>
                    <Button
                        variant="contained"
                        className="form__button"
                        endIcon={<SendIcon />}
                        onClick={click}
                    >
                        Удалить
                    </Button>
                </FormControl>
            </div>
            {
                file.length !== 0 ?
                    <ControlPanel
                        page={pageNumber}
                        maxPage={numPages}
                        changePageHandler={changePageHandler}
                        clickForward={clickForwardHandler}
                        clickBack={clickBackHandler}
                        clickFirstPage={clickFirstHandler}
                        clickLastPage={clickLastHandler}
                        zoom={zoom * 100}
                        changeZoomHandler={changeZoomHandler}
                    />
                    : null
            }

            {
                file.length !== 0 ?
                    <Document file={file.length !== 0 ? file[0] : null} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} className="page" scale={zoom} />
                    </Document>
                    : null
            }
        </div>
    );
};

export default PDFDelete;
