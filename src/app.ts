import { MongoDataBase } from "./data/mongo"
async function main() {
    
    await MongoDataBase.connect({
        mongoUrl: 'mongodb://usuario:12345@localhost:27018',
        dbName: 'EntrenoYA'
    });
}