import { useLocation } from "react-router-dom";
import { Box } from '@mui/material';

function Virhe() {
    const location = useLocation();
    const { virheViesti} = location.state || {};
    return (
        <Box sx= {{
            position: 'absolute',
            top: '15%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'red'
        }}>
            {virheViesti}
        </Box>
    )

}

export default Virhe;