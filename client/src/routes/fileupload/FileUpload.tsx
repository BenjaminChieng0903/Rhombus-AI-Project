import React, { useState, useRef } from "react";
import './FileUpload.css'
const FileUpload = ()=>{
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Handle file selection from input
    const handleFileSelect = (event:React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if(files && files.length > 0)
        setFile(files[0]);
    };

    // Handle drag and drop events
    const handleDragEnter = (event:React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(true);

    };

    const handleDragLeave = (event:React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
    };

    const handleDragOver = (event:React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(true);
    };

    const handleDrop = (event:React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);

        if (event.dataTransfer.files && event.dataTransfer.files[0] &&
            (event.dataTransfer.files[0].name.endsWith('.csv')||
            event.dataTransfer.files[0].name.endsWith('.xlsx') )) {
            setFile(event.dataTransfer.files[0]);
        }else{
            alert('wrong file type! Only receive .csv or .xlsx')
        }
    };
    const handleButtonClick = () => {
        fileInputRef?.current?.click();
    };
    return(
        <div className="container">
        <h2>Type Converter</h2>
        <div
            className={`file-upload ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <input
                type="file"
                id="fileInput"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept = ".csv, .xlsx"
            />

                <button className="choose-file-button" type="button" onClick={handleButtonClick}>
                    Choose File
                </button>
            <p>Or drag and drop a file here</p>
            {file && <p>Selected file: {file.name}</p>}
        </div>
        <button className="upload-button">Upload & Convert</button>
    </div>
    );
};

export default FileUpload