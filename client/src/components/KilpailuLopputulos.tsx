import React, {useContext} from 'react';
import {Paper, Stack, Typography, List, ListItem, ListItemText, Button} from '@mui/material';
import {useNavigate, NavigateFunction} from 'react-router-dom';
import { KilpailuContext } from '../context/KilpailuContext';
import {Kilpailija} from '../context/KilpailuContext';


const KilpailuLopputulos : React.FC = () : React.ReactElement => {

    const navigate : NavigateFunction = useNavigate();

    const {kilpailijat, lisaaKilpailu} = useContext(KilpailuContext);

    const lisaaLopputulos = () => {
        lisaaKilpailu();
        navigate("/");
    }

    const voittajaJarjestys = kilpailijat.sort((a: any, b : any) => {if (a.pisteet !== b.pisteet){return b.pisteet- a.pisteet}});

    const voittajat = voittajaJarjestys.filter((a : Kilpailija) => a.pisteet === voittajaJarjestys[0].pisteet);

    const muutKuinVoittajat = voittajaJarjestys.filter((a : Kilpailija) => a.pisteet !== voittajat[0].pisteet);


    return (
    <Paper
        elevation={2}
        sx={{ padding : 2, marginBottom : 2, marginTop : 10}}
    >
        <Stack spacing={2}>
        <Typography
            variant="h6" 
            sx={{marginBottom: 3}}>Kilpailun lopputulokset:</Typography>
        { <List>
                    {voittajat.map((kilpailija: Kilpailija, idx: number) => {
                        return (
                            <ListItem key={idx} sx={{fontStyle: 'italic', fontsize: 20}}>
                                    <ListItemText sx={{fontSize : 'h6'}}>Voittaja : {kilpailija.nimi}, {kilpailija.pisteet} pistettä</ListItemText>
                            </ListItem>
                        )
                    })}
                    {muutKuinVoittajat.map((kilpailija : Kilpailija, idx : number) => {
                            return(
                                <ListItem key={idx}>
                                    <ListItemText>{kilpailija.nimi}: {kilpailija.pisteet} pistettä</ListItemText>
                                </ListItem>
                            )
                        })
                    }
            </List>
        }
            <Button
                fullWidth={true}
                variant="contained"
                onClick={lisaaLopputulos}
             >Lisää kilpailu</Button>
        </Stack>
    </Paper>    
    )
}
export default KilpailuLopputulos;