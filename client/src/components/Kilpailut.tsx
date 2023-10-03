import React, {useState, useContext} from 'react';
import {List, ListItem, Paper, Typography, Button, Stack} from '@mui/material';
import {useNavigate, NavigateFunction} from 'react-router-dom';
import Lopputulos from './Lopputulos';
import {KilpailuContext} from '../context/KilpailuContext';
import {Kilpailu} from '../context/KilpailuContext';


const Kilpailut : React.FC = () : React.ReactElement =>  {

    
    const [avaaLopputulosDialogi, setAvaaLopputulosDialogi] = useState<boolean>(false);

    const {apiData, haeLopputulos} = useContext(KilpailuContext);


    const navigate : NavigateFunction = useNavigate();

    return (
    <Paper
        elevation={2}
        sx={{ padding : 2, marginBottom : 2, marginTop : 10}}
    >
        <Stack spacing={2}>
            <Typography 
                variant= 'h6'
            >Tikanheiton tulossovellus</Typography>
            <List>
            <Typography
                sx={{marginBottom: 3}}>Aiemmat pelit:</Typography>
            
            { (apiData.kilpailut.map((kilpailu : Kilpailu, idx : number ) => {
                return (
                <Button
                    key={idx}
                    fullWidth={true}
                    variant='outlined'
                    sx={{marginBottom: 2}}
                    onClick = {() => {
                        haeLopputulos(kilpailu.id);
                        setAvaaLopputulosDialogi(true);
                    }}
                >
                    <ListItem>
                    {kilpailu.nimi} {kilpailu.pvm.split('T')[0]} klo {(kilpailu.pvm.split('T')[1]).split('Z')[0]}
                    </ListItem>
                </Button>
                )
            }))
        
            }
        </List>
        
        <Button
            variant='contained'
            fullWidth={true}
            onClick={() => {navigate("/Kilpailijat")}}>Aloita uusi kilpailu
        </Button>
        <Lopputulos openDialog={avaaLopputulosDialogi} setOpenDialog={setAvaaLopputulosDialogi}  />
        </Stack>
    </Paper>
    )
}
export default Kilpailut;
