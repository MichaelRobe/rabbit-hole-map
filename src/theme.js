import { createTheme, responsiveFontSizes } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#000011',
        },
        secondary: {
            main: grey[500],
        },
        background: {
            default: '#121212',
            paper: '#262626',
        },
    }
    
});

export default responsiveFontSizes(theme);

