import { Box, List, ListSubheader, ListItem } from '@mui/material';

function Etusivu() {

    return (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" style={{ height: '100%', paddingTop: '20px' }}>

        <List>
          <ListSubheader>
          Tervetuloa menojen seurantaan! Tällä sivulla:
          </ListSubheader>
          <ListItem> - näet listauksen menoista </ListItem>
          <ListItem> - voit hakea menoja kategorian tai maksajan mukaan </ListItem>
          <ListItem> - voit lisätä uuden menon </ListItem>
          <ListItem> - voit tarkastella menoja kaaviosta </ListItem>

        </List>

        </Box>
    )


}

export default Etusivu;

//ChatGPTtä käytetty apuna virheiden etsimiseen ja backin luomiseen