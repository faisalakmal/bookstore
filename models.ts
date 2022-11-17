import { DataTypes, Model,Optional } from "sequelize";
import { underscoredIf } from "sequelize/types/utils";
import { getDbConnect } from "./sequelize";

export type MasterBooks = {
    id?: number
    name_book:string
    category:string
    years:number
    name_writer:string
    rak_book:number
}



export const BooksTable = getDbConnect().define<Model<MasterBooks>>('master_books',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name_book: DataTypes.STRING,
    category:DataTypes.STRING,
    years: DataTypes.NUMBER,
    name_writer: DataTypes.STRING,
    rak_book:DataTypes.NUMBER,
})