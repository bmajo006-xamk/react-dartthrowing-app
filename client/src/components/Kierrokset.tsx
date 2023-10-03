import React, {useContext} from 'react';
import {FormControl, Select, MenuItem, Typography, Button, Paper} from '@mui/material';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { KilpailuContext } from '../context/KilpailuContext';


const Kierrokset : React.FC = () : React.ReactElement => {


const navigate : NavigateFunction = useNavigate();

const {kierrokset, setKierrokset} = useContext(KilpailuContext);

const handleChange = (e : any) => {

    setKierrokset(e.target.value);

}
const aloitaKilpailu = () => {
    navigate("/kierros");
}
    return (
    
    <Paper
        elevation={2}
        sx={{ padding : 2, marginBottom : 2, marginTop : 10}}
    >
        <FormControl fullWidth>
            <Typography variant="h6" sx={{marginBottom: 3}}>Valitse kierrokset</Typography>
            
            <Select
                id="demo-simple-select-outlined"
                value={kierrokset}
                onChange={(e) => {handleChange(e)}}
            >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
            </Select>
            <Button 
                onClick={aloitaKilpailu}
                variant="contained"
                size="large"
                sx={{marginTop: 3}}
                fullWidth={true}>Aloita kierros 1</Button>
        </FormControl>
    </Paper>
    )
} 
export default Kierrokset;