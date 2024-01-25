import { useEffect, useState, useMemo, useCallback } from "react";
import { useDropzone } from 'react-dropzone'


import RelatedPageService from "../../Services/RelatedPageService";
import StyledFileUpload from "../../styled_components/StyledFileUpload";
import BouncingUploadIcon from "../../styled_components/BouncingUploadIcon";


const FileUpload = ({ setPages }) => {

  const [file, setFile] = useState(
    {
      'Browser History': [
        { title: "Google", url: "https://www.google.com" }
      ]
    }
  );

  useEffect(() => {
    setPages([])
    const filteredPages = RelatedPageService.getFilteredWikiPages(file['Browser History']);
    setPages(filteredPages)
  }, [file]);

  

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

  return (
    <StyledFileUpload  {...getRootProps() } isFocused={isFocused} isDragAccept={isDragAccept} isDragReject={isDragReject}>
      <input {...getInputProps()} />
      <BouncingUploadIcon isDragAccept={isDragAccept} fontSize="large" /> 
      {isDragReject ? <p>JSON files only</p> : <p>Upload Browser History ...</p>}
    </StyledFileUpload>
  );
}

export default FileUpload;