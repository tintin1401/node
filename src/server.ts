import app from './app';
import { MongoDataBase, UserModel } from './data';

const PORT = process.env.PORT || 3000;

(async () => {
  await MongoDataBase.connect({
    mongoUrl: 'mongodb://usuario:12345@localhost:27018',
    dbName: 'EntrenoYA'
  });

  // const user = await UserModel.create({
  //       fullName: "Joze Zamora",
  //       email: "josezamora@aeteme.com",
  //       password: "password123",
  //       role: "client",
  //       phone: "898898989899",
  //   });

  //   await user.save();
  //   console.log(user);



  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
})();