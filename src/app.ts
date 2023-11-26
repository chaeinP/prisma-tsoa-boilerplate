import cors from 'cors';
import express from 'express';
import swaggerUI from 'swagger-ui-express';

import { errorHandler } from './middlewares/error-handler';
import { RegisterRoutes } from './routes/routes';
import swaggerFile from './swagger.json';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

const app: express.Application = express();

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

RegisterRoutes(app);

app.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerFile, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.3/swagger-ui.min.css',
  }),
);

app.get('/health', (req, res) => res.send('OK'));

app.use(function notFoundHandler(_req, res) {
  res.status(404).send('Not Found');
});

app.use(errorHandler);

export default app;
