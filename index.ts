import { Console } from "console";
import express, {Application, Request, Response} from "express";
import { BooksTable, MasterBooks } from "./models";
import bodyParser from "body-parser";


export interface IHome{
    addBooks(Books:MasterBooks):Promise<MasterBooks>
    updateBooks(id:number,Books:MasterBooks):Promise<MasterBooks>
}

export class Home implements IHome {

    addBooks = async (books: MasterBooks): Promise<MasterBooks> => {
        if(!books) throw new Error('req body empty')
        await BooksTable.create({
            ...books})
        const getBooks = await BooksTable.findOne({
            order: [['id', 'DESC']]
        }) as any
        return getBooks?.get({plain: true}) || null
    }
    updateBooks = async (id:number, books:MasterBooks): Promise<MasterBooks> =>{
        if(!books) throw new Error('req body empty')
        if(!id) throw new Error('id body empty')
        await BooksTable.update(books,{ where:{
            id
        }})
        const getData = await BooksTable.findOne({
            where:{
                id
            }
        }) as any
        return getData?.get({plain:true}) || null
    }
    
}

class App {
    public app: Application
    private _home : Home
    constructor(home:Home){
        this._home = home
        this.app = express()
        this.plugins()
        this.routes()
    }

    protected routes(): void{
        this.app.route("/").get((req:Request, res: Response) =>{
            res.send({
                status:"Ok",
                message:"Success",
                timestamp: new Date()
            })
        })
        this.app.route("/save").post(async (req:Request, res:Response) =>{
            let body:MasterBooks = {
                name_book:req.body.name_book,
                category:req.body.category,
                years:req.body.years,
                name_writer:req.body.name_writer,
                rak_book:req.body.rak_book
            }
            
            const addsBooks = await this._home.addBooks(body)
            res.json(addsBooks)
        })
        this.app.route('/update/:id').put(async (reqs:Request, res:Response)=>{
            let body:MasterBooks = {
                name_book:reqs.body.name_book,
                category:reqs.body.category,
                years:reqs.body.years,
                name_writer:reqs.body.name_writer,
                rak_book:reqs.body.rak_book
            }
            let ids = Number(reqs.params.id)
            const updateBooks = await this._home.updateBooks(ids,body)
            res.json(updateBooks)
        }) 
    }

    protected plugins():void{
        this.app.use(bodyParser.json())
    }
}
const port: number = Number(3010)
const home = new Home()
const app = new App(home).app
app.listen(port)
console.log(`Listening on Port ${port}`)