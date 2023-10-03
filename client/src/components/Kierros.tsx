import React, {useContext, useState, useRef} from 'react';
import {Paper, TextField, List, ListItem, Typography, Button} from '@mui/material';
import { KilpailuContext } from '../context/KilpailuContext';
import {useNavigate, NavigateFunction} from 'react-router-dom';
import {Kilpailija} from '../context/KilpailuContext';


const Kierros : React.FC = () : React.ReactElement => {

    const {kilpailijat, setKilpailijat, kierrokset} = useContext(KilpailuContext);

    const [kierros, setKierros] = useState<number>(1);

    const [lopputulokseen, setLopputulokseen] = useState<boolean>(false);
 
    const lomakeref = useRef<any>();

    const navigate : NavigateFunction = useNavigate();

    const kilpailijaLista = kilpailijat.map((kilpailija : Kilpailija, idx : number) => {
        return (
        <ListItem key={idx}>
            <Typography sx={{marginBottom: 3, width: '100%'}}>{kilpailija.nimi}</Typography>
                <TextField
                    sx={{marginTop: 2}} 
                    variant="outlined"
                    name="pisteet"
                    label="yhteistulos"
                />
        </ListItem>
        )
    })

    const vaihdaKierrosta = () => {

       if ( kierros < kierrokset) { 

        let updatedKilpailijat : any = [...kilpailijat];
        
        updatedKilpailijat.map((kilpailija : Kilpailija, idx : number) => {

            updatedKilpailijat[idx].pisteet = Number(lomakeref.current.pisteet[idx].value) + Number(updatedKilpailijat[idx].pisteet);
        });
        setKilpailijat(updatedKilpailijat);
        setKierros(kierros+1);

        if (kierros+1 === kierrokset){
            setLopputulokseen(true);
        }

       } 
    }

    const siirryLopputulokseen = (e : React.FormEvent) => {
        
        e.preventDefault();
        
        const updatedKilpailijat : any = [...kilpailijat];
        
        updatedKilpailijat.map((kilpailija : Kilpailija, idx : number) => {

            updatedKilpailijat[idx].pisteet = Number(lomakeref.current.pisteet[idx].value) + Number(updatedKilpailijat[idx].pisteet);
            
        });
        setKilpailijat(updatedKilpailijat);
        navigate("/lopputulokset");



    }
    return (
        <Paper
            elevation={2}
            sx={{ padding : 2, marginBottom : 2, marginTop : 10}}
            component = "form"
            ref= {lomakeref}
            onSubmit={siirryLopputulokseen}

        >
            <Typography variant="h6">Kierros {kierros}/{kierrokset}</Typography>
            <List>{kilpailijaLista}</List>
            { (lopputulokseen || kierrokset === 1) ?
            <Button
               variant="contained"
               fullWidth={true}
               size="large"
               onClick={siirryLopputulokseen}
               sx={{marginBottom : 2}}>Näytä lopputulokset</Button>
            :
            <Button
                variant="contained"
                fullWidth={true}
                size="large"
                onClick={vaihdaKierrosta}
                sx={{marginBottom: 2}}>Siirry kierrokseen {kierros+1}</Button>
            }
        </Paper>


    )
}
export default Kierros;