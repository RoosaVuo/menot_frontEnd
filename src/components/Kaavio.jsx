import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography } from '@mui/material';
import {getMenot} from '../components/menoja'
import { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { BarChart } from '@mui/x-charts/BarChart';

export default function Kaavio() {

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
 
  const maksajat = menot.map(meno => {
    return(
      {
        id: meno.id,
        value: meno.summa,
        label: meno.maksaja
      }
    )
  })

  const maksajanSummat = maksajat.reduce((acc, curr) => {
    if(acc[curr.label]) {
      acc[curr.label].value += curr.value;
    } else{
      acc[curr.label] = {label: curr.label, value: curr.value};
    }
    return acc;
  }, {});

  const maksajanSummatTaulukkona = Object.values(maksajanSummat);

  console.log(maksajanSummatTaulukkona);


  const kategoriat = menot.map(meno => {
    return(
      {
        id: meno.id,
        value: meno.summa,
        label: meno.kategoria,
        maksaja: meno.maksaja
      }
    )
  })

  const kategorianSummat = kategoriat.reduce((acc, curr) => {
    if(acc[curr.label]) {
      acc[curr.label].value += curr.value;
    } else{
      acc[curr.label] = {label: curr.label, value: curr.value};
    }
    return acc;
  }, {});

  const kategorianSummatTaulukkona = Object.values(kategorianSummat);

  //pylvästaulukko

  const tarpeellisuus1 = menot.filter(meno => meno.tarpeellisuus === 1);
  const tarpeellisuus2 = menot.filter(meno => meno.tarpeellisuus === 2);
  const tarpeellisuus3 = menot.filter(meno => meno.tarpeellisuus === 3);
  const tarpeellisuus4 = menot.filter(meno => meno.tarpeellisuus === 4);
  const tarpeellisuus5 = menot.filter(meno => meno.tarpeellisuus === 5);

  function laskenta(t) {
    let montako = 0;
    for (var i=0; i<t.length; i++) {
      montako = montako+1;
    }
    return montako;
  }

  return (
    <>
    <Box p={5} display="flex" justifyContent="center" alignItems="center">
      <Box textAlign={'center'}>
        <Typography>Menojen jakautuminen maksajien mukaan</Typography>
          <PieChart
            series={[
              {
                data: maksajanSummatTaulukkona,
              },
            ]}
            width={400}
            height={200}
          />
      </Box> 

      <Box flexDirection="column" textAlign={'center'}>
        <Typography>Menojen jakautuminen kategorioiden mukaan</Typography>
          <PieChart
            series={[
              {
                data: kategorianSummatTaulukkona,
              },
            ]}
            width={400}
            height={200}
          />
      </Box>

    </Box>


    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Typography>Menojen jakautuminen tarpeellisuuden mukaan</Typography>
        <BarChart
            xAxis={[{ scaleType: 'band', data: ['Turha', 'Melko tarpeellinen', 'Tarpeellinen','Hyvin tarpeellinen', 'Välttämätön']  }]}
            series={[{ data: [laskenta(tarpeellisuus1), laskenta(tarpeellisuus2), laskenta(tarpeellisuus3), laskenta(tarpeellisuus4), laskenta(tarpeellisuus5)]  }]}
            width={700}
            height={250}
          />
      </Box>

    </>

  );
}
