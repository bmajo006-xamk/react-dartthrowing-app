import express from 'express';
import {PrismaClient} from '@prisma/client';


const apiKilpailutRouter : express.Router = express.Router();

const prisma : PrismaClient = new PrismaClient();

apiKilpailutRouter.use(express.json());

apiKilpailutRouter.get("/", async(req: express.Request, res: express.Response) => {

    try {

        res.json(await prisma.peli.findMany({
            orderBy : [
                {
                    pvm : 'desc'

                }
            ]
        }));


    }catch(e: any){

    }

});
apiKilpailutRouter.post("/", async(req: express.Request, res: express.Response) => {

    
    try {

        res.json(await prisma.peli.create({
            data: {
                nimi: req.body.nimi,
                kierrokset: req.body.kierrokset

            }
        }));


    }catch (e : any){


    }
});

export default apiKilpailutRouter;