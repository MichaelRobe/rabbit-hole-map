import { useEffect, useState, useMemo, useCallback } from "react";
import { useDropzone } from 'react-dropzone'
import BouncingUploadIcon from "../../styled_components/BouncingUploadIcon";

import RelatedPageService from "../../Services/RelatedPageService";


const FileUpload = ({ setPages }) => {

  const [file, setFile] = useState(
    {
      'Browser History': [
        { title: "Google", url: "https://www.google.com" }
      ]
    }
  );

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#919191',
    borderStyle: 'dashed',
    backgroundColor: '#303030',
    color: '#919191',
    outline: 'none',
    transition: 'all .24s ease-in-out',
    position: 'absolute',
    zIndex: '10',
    marginTop: '20px' 
  };

  const focusedStyle = {
    borderColor: '#2196f3'
  };

  const acceptStyle = {
    borderColor: '#00e676'
  };

  const rejectStyle = {
    borderColor: '#ff1744'
  };

  const activeStyle = {
    borderColor: 'green'
  };

  

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        const fileContent = JSON.parse(reader.result);
        setFile(fileContent);
      };

      reader.readAsText(file);
    })
  }, []);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, accept: {'application/json': ['.json']} });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject,
  ]);

  useEffect(() => {
    setPages([])
    const filteredPages = RelatedPageService.getFilteredWikiPages(file['Browser History']);
    setPages(filteredPages)
  }, [file]);

  return (
    <div  {...getRootProps({ style })}>
      <input {...getInputProps()} />
      <BouncingUploadIcon className={isDragAccept ? 'animate-bounce' : ''} fontSize="large" /> 
      {isDragReject ? <p>JSON files only</p> : <p>Upload Browser History ...</p>}
    </div>
  );
}

export default FileUpload;