import Lomake from './components/Lomake.jsx';
import Menot from './components/Menot.jsx';
import Kaavio from './components/Kaavio.jsx';
import Etusivu from './components/Etusivu.jsx';
import MenotHaku from './components/MenotHaku.jsx'
import MenotMuokkaus from './components/MenotMuokkaus.jsx'
import Taulukko from './components/Taulukko.jsx'
import NaviMUI from './components/NaviMUI.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { createBrowserRouter, RouterProvider, useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import Virhe from './components/Virhe';


const theme = createTheme({
  palette: { 
    primary: {main: 'rgba(63,141,181,0.86)',
              light: 'rgba(70,195,34,0.91)',
              dark: '#012058',
            },
    secondary: {main: '#ff6320',
                light: '#ff8753',
                dark: '#aa3402',
              },
    text: { secondary: '#e64200' 
              },
  }, 
  typography: { 
    fontFamily: "'Inconsolata', 'monospace'",
  }, 

});
      
function Error() {
  let error = useRouteError();
  if (isRouteErrorResponse(error)){
    //jos reititysvirhe
    return(
    <Box>
      {error.status} {error.data}
      <Link to='/'>Etusivulle</Link>
    </Box>);
  }
  //jos jokin muu virhe
  return (
    <Box>
      {error.message}
      <Link to='/'>Etusivulle</Link>
    </Box>
  );

}

const router = createBrowserRouter([
  {
  element: <NaviMUI />,
  errorElement: <Error />,
      children: [
      {
      path: '/',
      element: <Etusivu />
      },
      {
        path: 'menot',
        element: <Menot/>
      },
      {
        path: 'haemenoja',
        element: <MenotHaku />
      },
      {
        path: 'lisaameno',
        element: <Lomake />
      },
      {
        path: 'menottaulukkona',
        element: <Taulukko />
      },
      {
        path: 'kaavio',
        element: <Kaavio />
      },
      {
        path: 'muokkaa/:id/:kuvaus/:paiva/:summa/:kategoria/:maksaja/:tarpeellisuus/:kuitti',
        element: <MenotMuokkaus />
      },
      {
        path: 'virhe',
        element: <Virhe />
      }

    ] 
  },
]);


function App() {
  
  return (
    <ThemeProvider theme={ theme }>
    <Box>
      <CssBaseline />
      <RouterProvider router={router} />
    </Box>
    </ThemeProvider>
    
  )
}

export default App
