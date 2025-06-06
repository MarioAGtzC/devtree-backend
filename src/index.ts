import 'dotenv/config';
import cors from 'cors';
import colors from 'colors';
import express from 'express';
import router from './routes';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';

const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(cors(corsConfig));

app.use(express.json());

app.use('/', router);

app.listen(port, () => {
  console.log(colors.blue.bold(`Server running on port: ${port}`));
});