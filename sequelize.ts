import { Sequelize } from "sequelize";

let dbConnect:Sequelize | null

export function getDbConnect():Sequelize{
    if(!dbConnect){
        dbConnect = new Sequelize("mysql://root:qwerty12345@localhost:3306/wms-xample",{define:{timestamps:false},logging:(msg) => console.log(msg)})
    }
    return dbConnect
}