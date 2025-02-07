import * as React from 'react';
import { useState } from 'react';
import { Box, AppBar, Tabs, Tab, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import HomeIcon from '@mui/icons-material/Home';
import PieChartIcon from '@mui/icons-material/PieChart';
import {  Link, Outlet } from 'react-router-dom';
import Menu from '@mui/material/Menu';


function NaviMUI() {

  const [value, setValue] = useState(0);

  const handleChange = (e, val) => {
    setValue(val);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box >
      <AppBar position='static'>
        <Tabs value={ value } onChange={ handleChange } textColor='inherit' indicatorColor="secondary" centered >
            <Tab label='Etusivu' icon={<HomeIcon />} component={Link} to='/' />
            <Tab
              label='Menot' icon={<ListIcon />}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              >
            </Tab>
            <Tab label='Hae menoja' icon={<SearchIcon />} component={Link} to='haemenoja' />
            <Tab label='Lisää meno' icon={<EditIcon />} component={Link} to='lisaameno' />
            <Tab label='Kaavio' icon={<PieChartIcon />} component={Link} to='kaavio' />
        </Tabs>

        <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}>
              <MenuItem onClick={handleClose}component={Link} to='menot'>Kortit</MenuItem>
              <MenuItem onClick={handleClose} component={Link} to='menottaulukkona'>Taulukko</MenuItem>
            </Menu>
      </AppBar>

      <Outlet />

    </Box>
  );
}

export default NaviMUI;

