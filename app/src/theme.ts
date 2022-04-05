import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  
  palette: {
    primary: {
      main:  '#800080'     //'#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  }, components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
           background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(29,4,45,1) 0%, rgba(161,57,171,0.9710083862646621) 65%, rgba(255,156,0,1) 98%)' 

         }
       }
     }
  }

});

export default theme;
