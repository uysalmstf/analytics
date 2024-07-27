import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './ormconfig';
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';

const app = express();
const PORT = 3002;

app.use(express.json());

app.use('/users', userRoutes);
app.use('/books', bookRoutes);

AppDataSource.initialize().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => console.log(error));