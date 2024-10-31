import { useRef, useState } from "react";
import { ApiResponse } from "src/type/ApiResponse";
import TypeConvertApi from "src/apis/type-convert/TypeConvert";
import './UploadEntry.css'
import ResultDisplayTable from "../ResultDisplayTable/ResultDisplayTable";
const UplaodEntry = ()=>{
    //restore uploaded file
    const [file, setFile] = useState<File | null>(null);
    //drag event flag
    const [dragActive, setDragActive] = useState(false);
    //ref for virtual dom controlling
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    //return data from backend
    const [dataResult, setDataResult] = useState<ApiResponse | null>(null)
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
        //handle choose file button click
        const handleButtonClick = () => {
            fileInputRef?.current?.click();
        };
        //handle upload event
        const handleUpload = async()=>{
            const response = await TypeConvertApi(file)
            setDataResult(response)    
        }
    
    return(
        <>
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

        <button className="upload-button" onClick={handleUpload}>Upload & Convert</button>
    
        <ResultDisplayTable dataResult={dataResult}/>
        </>
    )
}


export default UplaodEntry