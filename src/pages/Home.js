import { Container } from '@mui/system';
import RelatedPageService from '../Services/RelatedPageService';
import FileUpload from '../components/FileUpload/FileUpload';
import GraphComponent from '../components/Graph/Graph';

import { useState } from 'react';
import { Button, Toolbar } from '@mui/material';

const Home = () => {

    const [pages, setPages] = useState([]);

    return (
        <Container>
            <Toolbar />
            <FileUpload setPages={setPages}  />
            <GraphComponent pages={pages} />
        </Container>
    );
}

export default Home;