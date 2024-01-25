import { Container } from '@mui/system';
import RelatedPageService from '../Services/RelatedPageService';
import FileUpload from '../components/FileUpload/FileUpload';
import GraphComponent from '../components/Graph/Graph';
import GraphToggle from '../components/GraphToggle';

import { useState } from 'react';
import { Box, Button, Toolbar } from '@mui/material';

const Home = () => {

    const [pages, setPages] = useState([]);
    const [isGraph3D, setIsGraph3D] = useState(false);
    

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center'}}>
            <FileUpload setPages={setPages}  />
            <GraphComponent isGraph3D={isGraph3D} pages={pages} />
            <GraphToggle isGraph3D={isGraph3D} setIsGraph3D={setIsGraph3D} />
        </Container>
    );
}

export default Home;