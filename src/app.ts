import { LogModel, MongoDataBase } from "./data/mongo"

(async () => {
        await main();
   
})();
async function main() {
    
    await MongoDataBase.connect({
        mongoUrl: 'mongodb://usuario:12345@localhost:27018',
        dbName: 'EntrenoYA'
    });

    const newLog = await LogModel.create({
        message: "This is a test log message",
        level: "medium",
        oring: "Backend"
    });

    await newLog.save();

    console.log(newLog);


}