import React, {useRef, useContext} from 'react';
import {Paper, Stack, TextField, Typography, Button, List, ListItem} from '@mui/material';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { Kilpailija, KilpailuContext} from '../context/KilpailuContext';



const Kilpailijat : React.FC = () : React.ReactElement => {

    
    const lomakeref = useRef<any>();

    const {kilpailijat, setKilpailijat, Pelaaja} = useContext(KilpailuContext);

    const navigate : NavigateFunction = useNavigate();

    const lisaaKilpailija = (e: React.FormEvent) => {
        
        e.preventDefault();

        (lomakeref.current.kilpailija.value.length > 1) ?
        setKilpailijat([...kilpailijat, new Pelaaja(lomakeref.current.kilpailija.value, 0)])
        : alert("Kilpailijan nimessä täytyy olla ainakin kaksi merkkiä");
    }


    return (
        <Paper
            component="form"
            onSubmit={lisaaKilpailija}
            elevation={2}
            sx={{ padding : 2, marginBottom : 2, marginTop : 10}}
            ref= {lomakeref}
        >
            <Stack spacing={2}>
                <Typography variant="h6">Syötä kilpailijat: </Typography>
                    <TextField
                        name="kilpailija"
                    />
                   <Button
                        type="submit"
                        size="large"
                        fullWidth={true}
                        variant="outlined"
                        >Lisää kilpailija</Button>
                   { 
                   (kilpailijat.length > 0 && kilpailijat.length < 2) ?

                    <List>
                    {kilpailijat.map((kilpailija : Kilpailija, idx : number) => {
                            return(
                                <ListItem sx={{}} key={idx}>{kilpailija.nimi}</ListItem>
                            )
                        })
                    }
                    </List>
                    : (kilpailijat.length >= 2) ? 
                    <List>
                    {kilpailijat.map((kilpailija : Kilpailija, idx : number) => {
                            return(
                                <ListItem sx={{}} key={idx}>{kilpailija.nimi}</ListItem>
                            )
                        })
                    }
                    <Button
                        variant="contained"
                        size="large"
                        fullWidth={true}      
                        onClick= {() => {

                            navigate("/kierrokset");}}    
                    >Aloita kilpailu</Button>
                    </List>
                    : null

                   }
            </Stack>
        </Paper>
    )
}
export default Kilpailijat;