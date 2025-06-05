import mongoose from 'mongoose';
interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}


export class MongoDataBase {
   static async connect( options: ConnectionOptions) {
       const { mongoUrl, dbName } = options;

       try {

           await mongoose.connect( mongoUrl, {
               dbName: dbName,
           });
           
           console.log(`Connected to MongoDB at ${mongoUrl}`);

        
       } catch (error) {
           console.error("Error connecting to MongoDB:", error);
           throw error;
       }
    }
}