import cors from 'cors';
import express from 'express';
import swaggerUI from 'swagger-ui-express';

import { errorHandler } from './middlewares/error-handler';
import { RegisterRoutes } from './routes/routes';
import swaggerFile from './swagger.json';

const app: express.Application = express();

app.use(cors());
app.use(express.json());

RegisterRoutes(app);
app.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerFile, {
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.3/swagger-ui.min.css',
  }),
);

app.get('/health', (req, res) => res.send('OK'));
app.use(errorHandler);

export default app;
