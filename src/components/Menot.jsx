import * as React from 'react';
import { Grid, Card, CardHeader, CardContent, CardMedia, CardActions, IconButton, Typography, Box, Collapse } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link} from 'react-router-dom';
import {getMenot} from '../components/menoja'
import {deleteMeno} from '../components/menoja'
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function Menot() {

  const navigate = useNavigate();

    const [menot, setMenot] = useState([]);

    const haeKaikkimenot = async () => {
   
    try{
      const response = await getMenot();
      if(response.status === 200) {
        setMenot(response.data);
      } else {
        navigate('/virhe', {
          state: { virheViesti: 'Tietojen haku ei onnistunut'}
        });
        
      }
    } catch (error) {
      navigate('/virhe', {
        state: {virheViesti: 'Tietojen haku ei onnistunut'}
      });
    }
  }

    useEffect(()=> {
      haeKaikkimenot();
    }, []);

    const poista = async (id) => {
      try {
        const response = await deleteMeno(id);
        console.log('Meno poistettu onnistuneesti:', response);
      } catch (error) {
        console.error('Poisto epäonnistui:', error);
      }
    }


  //tarpeellisuus

  const labels = {
    1: 'Turha',
    2: 'Melko tarpeellinen',
    3: 'Tarpeellinen',
    4: 'Hyvin tarpeellinen',
    5: 'Välttämätön',
  };

  
  function getLabelText(value) {
    return `${labels[value]}`;
  }

  //kuitin avaus

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

 


  return (
    <Grid container spacing={2} sx={{ marginTop: 1, marginLeft:1 }} display="flex" justifyContent="center"  style={{ height: '100%', paddingTop: '20px' }}>
      {
        menot.map(meno => {

          let paiva = meno.paiva.split('-');
          let uusiPaiva = paiva[2] + '.' + paiva[1] + '.' + paiva[0];
          return (
            <Grid item key={meno.id}>
              <Card sx={{ width: 300}}>
                <CardHeader title={meno.kuvaus} subheader={meno.summa + '€'}  />

                <CardContent>
                    <Typography>Päivämäärä:  {uusiPaiva} </Typography>
                    <Typography>Kategoria: {meno.kategoria}</Typography>
                    <Typography>Maksaja: {meno.maksaja}</Typography>
                    <Typography>Tarpeellisuus: </Typography>
                    <Rating name="read-only" value={meno.tarpeellisuus} readOnly />
                    <Box>{getLabelText(meno.tarpeellisuus)}</Box>

                </CardContent>

                <CardActions disableSpacing>
                  <IconButton color='primary' component={Link} to={'/muokkaa/'  +  meno.id + '/' + meno.kuvaus + '/' + meno.paiva + '/' + meno.summa + '/' + meno.kategoria + '/' + meno.maksaja + '/' + meno.tarpeellisuus + '/' + meno.kuitti }><EditIcon /></IconButton>                
                  <IconButton color='secondary' onClick={()=> poista(meno.id)} ><DeleteIcon /></IconButton>

                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <Typography>Näytä kuitti</Typography>
                    <ExpandMoreIcon />
                  </ExpandMore>

                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                  {
                      meno.kuitti ?
                    <CardMedia component='img' 
                    image={'http://localhost:8080/download/' + meno.kuitti} alt={meno.kuvaus} />
                    :
                    <CardContent>
                      <Typography>Ei kuittia</Typography>
                    </CardContent>
                    }
                  </CardContent>
                </Collapse>
              
              </Card> 
            </Grid>
          )
        })
      }
    </Grid>
  )
}

export default Menot;
