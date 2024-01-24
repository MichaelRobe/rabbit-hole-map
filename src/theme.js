import { createTheme, responsiveFontSizes } from '@mui/material';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f59b20',
        },
        background: {
            default: '#121212',
            paper: '#262626',
        },
    }
    
});

export default responsiveFontSizes(theme);

