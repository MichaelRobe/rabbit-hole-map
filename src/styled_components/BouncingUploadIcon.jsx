import styled, { keyframes } from 'styled-components';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const BouncingUploadIcon = styled(UploadFileIcon)`
  animation: ${(props) => (props.isDragAccept ? bounce : '')} 1s infinite;
`;

export default BouncingUploadIcon;