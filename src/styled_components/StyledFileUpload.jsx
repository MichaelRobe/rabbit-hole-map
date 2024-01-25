import React from 'react'
import {useDropzone} from 'react-dropzone'
import styled from 'styled-components'

const StyledFileUpload = styled.div`
  position: absolute;
  z-index: 10;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 15px;
  margin:10px;
  border: 2px dashed;
  color: ${(props) => (props.isDragAccept ? 'white' : 'darkgrey')};
  opacity: ${(props) => (props.progress == 100 ? 0.2 : 1)};
  transition: all 0.2s;
  &:hover {
    opacity: 1;
  }
`
export default StyledFileUpload
