import express from 'express'; //npm install --save-dev @types/express { if u use typescript you need eject this line in the console. }
import userRouter from './routes/user.router'; // Import the user router
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});// Use the user router
export default app;