
import { Typography, Box} from '@mui/material';
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {getMenot} from '../components/menoja'
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'kuvaus', headerName: 'Kuvaus', width: 300 },
  { field: 'paiva', headerName: 'Päivämäärä', width: 200 },
  { field: 'summa', headerName: 'Summa', width: 130 },
  { field: 'kategoria', headerName: 'Kategoria', width: 130 },
  { field: 'maksaja', headerName: 'Maksaja', width: 130 },
  { field: 'tarpeellisuus', headerName: 'Tarpeellisuus', width: 130 },
];


export default function Taulukko() {

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



  const minimi = Math.min(...menot.map(meno => meno.summa));
  const maksimi = Math.max(...menot.map(meno => meno.summa));

  return (
    <Box p={2} >
   
    
      <DataGrid
        rows={menot}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    

    <Typography p={2}>
      Pienin summa: {minimi}
      <br/>
      Suurin summa: {maksimi}
     
    </Typography>

    </Box>
  );
}
