import { LogModel, MongoDataBase } from "./data/mongo"

(async () => {
        await main();
   
})();
async function main() {
    
    await MongoDataBase.connect({
        mongoUrl: 'mongodb://usuario:12345@localhost:27018',
        dbName: 'EntrenoYA'
    });

    /*
    Create a new log entry
    const newLog = await LogModel.create({
        message: "This is a test log message",
        level: "medium",
        oring: "Backend"
    });
    Wait for the log to be saved
    await newLog.save();

    console.log(newLog);
    Fetch the last 10 logs
    const logs = await LogModel.find({}).sort({ createdAt: -1 }).limit(10);
    
    console.log(logs[0].createdAt);

    */

   


}