import express from 'express';
import { env } from './config/env';
import identifyRoutes from './routes/identifyRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/', identifyRoutes);

app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});
