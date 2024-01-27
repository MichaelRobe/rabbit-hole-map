import { useEffect, useState, useCallback } from "react";
import { useDropzone } from 'react-dropzone'


import RelatedPageService from "../../Services/RelatedPageService";
import StyledFileUpload from "../../styled_components/StyledFileUpload";
import BouncingUploadIcon from "../../styled_components/BouncingUploadIcon";


const FileUpload = ({ pages, setPages, progress }) => {

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
        try {
          const fileContent = JSON.parse(reader.result);
          setFile(fileContent);
        } catch (error) {
          console.log(error);
        }
      };

      reader.onerror = (error) => {
        console.log(error);
      };

      reader.readAsText(file);
    })
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, accept: {'application/json': ['.json']} });

  const progressPercent = (progress / pages.length) * 100;

  return (
    <StyledFileUpload  {...getRootProps() } isdragaccept={isDragAccept.toString()} progress={progressPercent}>
      <input {...getInputProps()} />
      <BouncingUploadIcon isdragaccept={isDragAccept.toString()} fontSize="large" /> 
      {isDragReject ? <p>JSON files only</p> : <p>Upload Browser History ...</p>}
    </StyledFileUpload>
  );
}

export default FileUpload;