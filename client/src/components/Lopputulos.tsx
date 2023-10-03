import {Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText, Button} from '@mui/material';
import {Dispatch, SetStateAction, useContext} from 'react';
import {KilpailuContext} from '../context/KilpailuContext';
import {Kilpailija} from '../context/KilpailuContext';

interface Props {
    openDialog: boolean
    setOpenDialog: Dispatch<SetStateAction<boolean>>

}

const Lopputulos : React.FC<Props> = (props: Props) : React.ReactElement => {

    const {kilpailijaData} = useContext(KilpailuContext);
    const kilpailijat = kilpailijaData.kilpailijat;

    const voittajaJarjestys = kilpailijat.sort((a: any, b : any) => {if (a.pisteet !== b.pisteet){return b.pisteet- a.pisteet}});

    const voittajat = voittajaJarjestys.filter((a : Kilpailija) => a.pisteet === voittajaJarjestys[0].pisteet);

    const muutKuinVoittajat = voittajaJarjestys.filter((a : Kilpailija) => a.pisteet !== voittajat[0].pisteet);


    return (
        <Dialog
            maxWidth= "lg"
            fullWidth= {true}
            open= {props.openDialog}
            onClose={() => {props.setOpenDialog(false);}}>
            <DialogTitle>Lopputulokset: </DialogTitle>
            <DialogContent>

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
        
            </DialogContent>
           
            <DialogActions>
                <Button 
                    onClick={() => {props.setOpenDialog(false)}}
                    variant='contained'>Sulje
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default Lopputulos;