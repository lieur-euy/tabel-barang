import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import api  from './api'
import auth from './auth'
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.use(express.json());
app.get('/', (req, res) => {
  res.json({
    message: 'test server',
  });
});
app.use('/api/v1', api);
app.use('/auth', auth);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});