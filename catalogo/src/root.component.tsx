import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Catalogo from './catalogo/catalogo';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { BsCart2 } from "react-icons/bs";
import { Link } from '@mui/material';

const queryClient = new QueryClient()

const Root: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

export default Root;

function App() {

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Catalogo
            </Typography>
            <a href="/carrito" style={{ textDecoration: "none" }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <BsCart2 />
              </IconButton>
            </a>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ mt: "20px" }}>
        <Catalogo />
      </Box>
    </Box>
  );
}
