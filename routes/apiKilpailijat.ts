import express from 'express';
import {PrismaClient} from "@prisma/client";

const prisma : PrismaClient = new PrismaClient();

const apiKilpailijatRouter : express.Router = express.Router();

apiKilpailijatRouter.use(express.json());

apiKilpailijatRouter.get("/:id", async(req: express.Request, res: express.Response) => {

    try{

        res.json(await prisma.kilpailija.findMany({
            where: {
                peliId : Number(req.params.id)
            },
            orderBy: {
                pisteet : 'desc'
            }

        }))

    }catch (e: any){

    }
});
apiKilpailijatRouter.post("/:id", async(req: express.Request, res: express.Response) => {

    try{
        const createMany = req.body.kilpailijat.map((pelaaja : any) => (
            prisma.kilpailija.create({
                data: pelaaja
            })
             ))
    
        
        Promise.all(createMany);
       

    }catch (e: any){


        
    }
});

export default apiKilpailijatRouter;