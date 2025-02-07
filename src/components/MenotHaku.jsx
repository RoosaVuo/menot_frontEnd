import { Box, TextField, Button } from '@mui/material';
import { useState } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import * as React from 'react';
import {getMenot} from '../components/menoja'
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';

function MenotHaku() {

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
    
    const [kategoria, setKategoria] = useState('');
    const [haetaan, setHaetaan] = useState(false);

    const muuta = (e) => {
        setKategoria(e.target.value);
        setHaetaan(false);
    }

    const hae = () => {
        setHaetaan(true);
    }

    const haeMenot = () => {
        if (haetaan) {
            let result = menot.filter(meno => meno.kategoria.toLowerCase() === kategoria.toLowerCase());

            if (result.length > 0) {
                let haku = result.map(meno => {
                    return (
                        <p key={meno.id}>
                            Kuvaus: {meno.kuvaus} <br />
                            Päivä: {meno.paiva} <br />
                            Summa: {meno.summa} <br />
                            Kategoria: {meno.kategoria} <br />
                            Maksaja: {meno.maksaja} <br />
                        </p>
                    ); 
                }) 

                return (haku);
            } else {
                return (<p>Tällä kategorialla ei löydy menoja</p>);
            } 
        }
    }

    
    const [maksaja, setMaksaja] = useState('');
    const [haetaan2, setHaetaan2] = useState(false);

    const muuta2 = (e) => {
        setMaksaja(e.target.value);
        setHaetaan2(false);
    }

    const hae2 = () => {
        setHaetaan2(true);
    }

    const haeMenotMaksaja = () => {
        if (haetaan2) {
            let result = menot.filter(meno => meno.maksaja.toLowerCase() === maksaja.toLowerCase());

            if (result.length > 0) {
                let haku2 = result.map(meno => {
                    return (
                        <p key={meno.kuvaus}>
                            Kuvaus: {meno.kuvaus} <br />
                            Päivä: {meno.paiva} <br />
                            Summa: {meno.summa} <br />
                            Kategoria: {meno.kategoria} <br />
                            Maksaja: {meno.maksaja} <br />
                        </p>
                    ); 
                }) 

                return (haku2);
            } else {
                return (<p>Tällä maksajalla ei löydy menoja</p>);
            } 
        }
    }
    return (
        <Box
            display="flex"
            justifyContent="center" 
            style={{ height: '100%', width:'100%' }}
        >

        <Box component='form' 
            autoComplete='off'
            sx={{ '& .MuiTextField-root': { marginBottom: 2 } }}
            gap={4}
            p={5}
            style={{ width: '50%'}}
            >

            <TextField label='kategoria' name='kategoria' value={kategoria} onChange={ (e) => muuta(e) } required fullWidth />

            <Box sx={{ textAlign: 'center' }}>
                <Button onClick={() => hae() } variant='contained' sx={{ marginRight: 3 }} startIcon={<CreateIcon />}>Hae</Button>
            </Box>

            {haeMenot()}
        </Box>
        
        <Box 
        component='form' 
        autoComplete='off'
        sx={{ '& .MuiTextField-root': { marginBottom: 2 } }}
        p={5}
        style={{ width: '50%'}}>
                <TextField label='maksaja' name='maksaja' value={maksaja} onChange={ (e) => muuta2(e) } required fullWidth />

                <Box sx={{ textAlign: 'center' }}>
                    <Button onClick={() => hae2() } variant='contained' sx={{ marginRight: 3 }} startIcon={<CreateIcon />}>Hae</Button>
                </Box>
            {haeMenotMaksaja()}
        </Box>
        </Box>

    )

}

export default MenotHaku;


