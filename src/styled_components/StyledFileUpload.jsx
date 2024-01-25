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
  background: linear-gradient(to right, #1a1a29 ${(props) => props.progress}%, transparent ${(props) => props.progress}%);
  transition: all 0.2s;
  -webkit-box-shadow:0px 0px 15px 10px rgba(255,255,255,0.1);
  -moz-box-shadow: 0px 0px 15px 10px rgba(255,255,255,0.1);
  box-shadow: 0px 0px 80px 20px rgba(255,255,255,0.1);
  &:hover {
    opacity: 1;
  }
`
export default StyledFileUpload
