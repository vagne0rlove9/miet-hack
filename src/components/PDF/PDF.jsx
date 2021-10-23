import React, { useState, useCallback } from "react";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useDropzone } from 'react-dropzone';
import ControlPanel from "../ControlPanel/ControlPanel";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { pink } from '@mui/material/colors';

import './PDF.css';

const PDF = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [file, setFile] = useState([]);

    const onDrop = useCallback(acceptedFiles => {
        setFile(acceptedFiles);
    }, [])
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDrop })

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    const handleChange = (event) => {
        let value = event.target.files[0];
        setFile(value);
        console.log(value);
        if (value) {
            let data = new FormData();
            data.append("file", value, value.name);
            //console.log('data:', data);
            // axios.post('/files', data)...
        }
    };

    const deleteHandler = event => {
        event.stopPropagation();
        setFile([]);
    }

    console.log(acceptedFiles);
    return (
        <div>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} className="dropzone__input"/>
                {
                    file.length === 0 ?
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
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
            <ControlPanel />
            <Document file={file.length !== 0 ? file[0] : null} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} className="page"/>
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
        </div>
    );
};

export default PDF;
