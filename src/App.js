import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Header from './components/Header/Header';

import theme from './theme';
import routes from './Routes';

const routeComponents = routes.map(({path, component}, key) => <Route path={path} element={component} key={key} />);

const App = () => {

    return(
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header pages={routes.filter(route => route.show_on_header).map(route => route.display_name)}/>
                <Routes>
                    {routeComponents}
                </Routes>
            </ThemeProvider>
        </>
    )
}

export default App