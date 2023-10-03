import React, { createContext, useEffect, useRef, useState } from "react";

export const KilpailuContext : React.Context<any> = createContext(undefined);

interface Props {
    children : React.ReactNode
}

export interface Kilpailu {
    id: number
    nimi: string
    kierrokset: number
    pvm: string

}
interface Apidata {
    haettu : boolean
    kilpailut: Kilpailu[]
    virheteksti : string
}
interface Kilpailijadata {
    haettu : boolean
    kilpailijat: Kilpailija[]
    virheteksti: string
}
export interface Kilpailija {
    id: number
    nimi: string
    pisteet: number
    peliId : number

}

export const KilpailuProvider : React.FC<Props> = (props: Props) : React.ReactElement => {

    const apiKutsuTehty : React.MutableRefObject<boolean> = useRef(false);

    const [apiData, setApiData] = useState<Apidata>({
        haettu : false,
        kilpailut : [],
        virheteksti : ''
        })
    const [kilpailijaData, setKilpailijaData] = useState<Kilpailijadata>({
        haettu : false,
        kilpailijat: [],
        virheteksti: ''
            })
    const [kierrokset, setKierrokset] = useState<number>(1);
    const [kilpailijat, setKilpailijat] = useState([]);


    class Pelaaja {

        nimi : string
        pisteet : number
        peliId : number

        constructor(nimi? : string, pisteet? : number, peliId? : number) {
            
            this.nimi = nimi || "Heikki"
            this.pisteet = pisteet || 0
            this.peliId = peliId || 0
        }
    }
    const haeKilpailut = async() : Promise<void> => {

            let url : string = "http://localhost:3001/api/kilpailut"
    
            try {
                const yhteys = await fetch(url, {
                    method: "GET"
                } )
                if (yhteys.status === 200) {
                  
                    setApiData({
                        ...apiData,
                        haettu: true,
                        kilpailut: await yhteys.json()
                    })
    
                } else {
                    setApiData({
                        ...apiData,
                        haettu: true,
                        virheteksti: "Palvelimella tapahtui odottamaton virhe"
                    })
                }
            }catch (e: any){
                setApiData({
                    ...apiData,
                    haettu: true,
                    virheteksti: "Palvelimeen ei saada yhteyttä"
                })
    
    
            }
        }
        const haeLopputulos = async (id : number) => {

            let url : string = `http://localhost:3001/api/kilpailijat/${id}`

    
            try{
    
                const yhteys = await fetch(url, {
                    method: "GET"
                })
                
                if (yhteys.status === 200){
                    setKilpailijaData({
                        ...kilpailijaData,
                        haettu: true,
                        kilpailijat: await yhteys.json()
                    })
                } else {
    
                    setKilpailijaData({
                        ...kilpailijaData,
                        haettu: true,
                        virheteksti: 'Palvelimella tapahtui odottamaton virhe'
                    })
    
                }
            }catch (e : any){
                
                setKilpailijaData({
                    ...kilpailijaData,
                    haettu: true,
                    virheteksti: 'Palvelimeen ei saada yhteyttä'
                })
    
            }
        }
        const lisaaPisteet = async (id : number) => {

            const updatedKilpailijat : any = [...kilpailijat];
        
            updatedKilpailijat.map((kilpailija: Kilpailija, idx : number) => {
                updatedKilpailijat[idx].peliId = id;
            });
            setKilpailijat(updatedKilpailijat);


             let url : string = `http://localhost:3001/api/kilpailijat/${id}`
             try{
                let yhteys  = await fetch(url, {
                            method: "POST", 
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({kilpailijat})
                            }
                            )
                console.log(yhteys);
            }catch (e : any){

            }
        }
        const lisaaKilpailu = async () : Promise<void>=> {

            let url : string = "http://localhost:3001/api/kilpailut";

            try{
                let yhteys  = await fetch(url, {
                            method: "POST", 
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                nimi: "Tikanheittopeli",
                                kierrokset: kierrokset
                            })
                            }
                            )
            const kilpailu = (await yhteys.json());
            lisaaPisteet(kilpailu.id)
            haeKilpailut();
            

            } catch (e: any){
                console.log("ei onnistunut");

            }

        }

    const value = {
        apiData,
        kilpailijaData,
        haeKilpailut,
        haeLopputulos,
        kierrokset,
        setKierrokset,
        kilpailijat,
        setKilpailijat,
        lisaaPisteet,
        lisaaKilpailu,
        Pelaaja

    }
    useEffect(() => {

            if (!apiKutsuTehty.current) {
                haeKilpailut();
            }
            return () => {
             apiKutsuTehty.current = true;
            }
    
        }, []);

return (
<KilpailuContext.Provider value={value}>
    {props.children}
</KilpailuContext.Provider>
)
}