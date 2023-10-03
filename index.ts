import express from 'express';
import cors from 'cors';
import apiKilpailutRouter from './routes/apiKilpailut';
import apiKilpailijatRouter from './routes/apiKilpailijat';

const app : express.Application = express();

const portti : number = Number(process.env.PORT) || 3001;

app.use(cors({origin : "http://localhost:3000"}));

app.use("/api/kilpailut", apiKilpailutRouter);
app.use("/api/kilpailijat", apiKilpailijatRouter);



app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!res.headersSent){
        res.status(404).json({viesti: "Vihreellinen reitti"});
    }
})


app.listen( portti, () => {
    console.log(`Palvelin käynnistyi osoitteeseen http://localhost:${portti}`);

});