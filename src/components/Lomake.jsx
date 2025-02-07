import { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, InputLabel, FormControl, Select, MenuItem, Slider } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import fi from 'date-fns/locale/fi';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {addMeno} from '../components/menoja';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import AttachmentIcon from '@mui/icons-material/Attachment';

function Lomake() {

  const navigate = useNavigate();

 const [meno, setMeno] = useState(
  {
  kuvaus: '', 
  paiva: new Date(),
  summa: '',
  kategoria: '',
  maksaja: '',
  tarpeellisuus: '',
  kuitti: []
  });

 const [viesti, setViesti] = useState('');

 const muuta = (e) => {
  setMeno(
    {
      ...meno, 
      [e.target.name]: e.target.value
    }
  )
 }

 const muutaPaiva = (e) => {
  setMeno({
    ...meno,
    paiva: e
  });

  setViesti('');
};

const muutaSumma = (e) => {
  setMeno({
    ...meno,
    summa: e.target.value
  });

  setViesti('');
};

const muutaKategoria = (e) => {
  setMeno({
    ...meno,
    kategoria: e.target.value
  });

  setViesti('');
};

const muutaMaksaja = (e) => {
  setMeno({
    ...meno,
    maksaja: e.target.value
  });

  setViesti('');
};

const muutaTarpeellisuus = (e) => {
  setMeno({
    ...meno,
    tarpeellisuus: e
  });

  setViesti('');
};

const muutaKuitti = (e) => {
  setMeno({
    ...meno,
    kuitti: e.target.files[0]
  });

  setViesti('');
}


 const lisaaMeno = async () => {

  const formData = new FormData();
  formData.append('kuvaus' , meno.kuvaus);
  let paiva = meno.paiva.getFullYear()+ "-" + (meno.paiva.getMonth()+1) + "-" + meno.paiva.getDate();
  formData.append('paiva' , paiva);
  formData.append('summa' , meno.summa);
  formData.append('kategoria' , meno.kategoria);
  formData.append('maksaja' , meno.maksaja);
  formData.append('tarpeellisuus' , meno.tarpeellisuus);
  formData.append('kuitti' , meno.kuitti);
  

  try {
    const response = await addMeno(formData);
    setMeno({
      kuvaus: '',
      paiva: new Date(),
      summa: '',
      kategoria: '',
      maksaja: '',
      tarpeellisuus: '',
      kuitti: []
    });

    setViesti('Lisättiin');

  } catch (error) {
    setViesti('Lisäys ei onnistunut');

  } 
}

 const tyhjenna = () => {

  setMeno({
    kuvaus: '',
    paiva: new Date(),
    summa: '',
    kategoria: '',
    maksaja: '',
    tarpeellisuus: '',
    kuitti: ''
  });

  setViesti('');
}

function valuetext(value) {
  return `${value}`;
}

const labels = {
  1: 'Turha',
  2: 'Melko tarpeellinen',
  3: 'Tarpeellinen',
  4: 'Hyvin tarpeellinen',
  5: 'Välttämätön',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const [value, setValue] = React.useState(2);
const [hover, setHover] = React.useState(-1);

const siirry = () => {
  navigate('/menot')
}

let kuittiNimi = '';
if (meno.kuitti !== null) {
  kuittiNimi = meno.kuitti.name;
}
  
  return (
    <Box 
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: '10px',
      m: '10px',
      height: '100%',
      paddingTop: '20px',
      width: '100%',
    }}>
      
    <Paper sx={{ p: '10px', m: '10px' }}>

      <Box component='form' autoComplete='off'
        sx={{ '& .MuiTextField-root': { marginBottom: 2 } }}>

         <TextField label='Kuvaus' name='kuvaus' value={meno.kuvaus}
          onChange={(e) => muuta(e) } required fullWidth autoFocus />
      
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fi}>
          <DesktopDatePicker name='paiva' value={meno.paiva}
            onChange={(e) => muutaPaiva(e) } sx={{ width: '100%' }}
          />
          </LocalizationProvider>

        <Typography>Summa €</Typography>

        <Slider
            aria-label="Summa"
            defaultValue={10}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            shiftStep={30}
            step={1}
            marks
            min={0}
            max={500}
            onChange={ (e) => muutaSumma(e)}
        />
                

          <FormControl sx={{ minWidth: 150, pr: '5px' }}>
                <InputLabel id="kategoria">Kategoria </InputLabel>
                <Select
                labelId="kategoria"
                id="valikko"
                value={meno.kategoria}
                onChange={ (e) => muutaKategoria(e)}
                autoWidth
                label="Kategoria"
                >
                    <MenuItem value={'Ruoka'}>Ruoka</MenuItem>
                    <MenuItem value={'Koti'}>Koti</MenuItem>
                    <MenuItem value={'Vapaa-aika'}>Vapaa-aika</MenuItem>
                  
                </Select>
            </FormControl> 


            <FormControl sx={{ minWidth: 150 }}>
                <InputLabel id="maksaja">Maksaja </InputLabel>
                <Select
                labelId="maksaja"
                id="maksajavalikko"
                value={meno.maksaja}
                onChange={ (e) => muutaMaksaja(e)}
                autoWidth
                label="Maksaja"
                >
            
                    <MenuItem value={'Roosa'}>Roosa</MenuItem>
                    <MenuItem value={'Mikko'}>Mikko</MenuItem>
                  
                </Select>
            </FormControl> 

        <Box>
        <Typography>Oston tarpeellisuus</Typography>
        <Rating
            name="hover-feedback"
            value={Number (meno.tarpeellisuus)}
            precision={1}
            getLabelText={getLabelText}
            onChange={(event, newValue, ) => {
              setValue(newValue);
              muutaTarpeellisuus(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>


        <input accept='image/*' name='kuitti' id='kuitti' type='file'
          onChange={ (e) => muutaKuitti(e) } hidden />

        <InputLabel htmlFor='kuitti'>
          <Typography sx={{ display: 'inline' }}>Kuitti</Typography>
          <Button component='span'>
            <AttachmentIcon />
          </Button>
          <Typography sx={{ display: 'inline' }}>{kuittiNimi}</Typography>
        </InputLabel>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Button onClick={() => lisaaMeno() } variant='contained' sx={{ marginRight: 3 }} startIcon={<CreateIcon />}>Lisää</Button>
          <Button onClick={() => tyhjenna() } variant='contained' sx={{ marginRight: 3 }} color='secondary' startIcon={<ClearIcon />}>Tyhjennä</Button>    
          <Button onClick={() => siirry() } variant='contained'>Siirry Kortit-sivulle</Button>       
        </Box>
      

      <Typography sx={{ marginTop: 3 }}>{viesti}</Typography>
    </Paper>

    </Box>
  );
}

export default Lomake;

 

