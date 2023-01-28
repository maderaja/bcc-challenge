import express from 'express';
const app = express();
import router from './app/routes/router.js';

const port = 3500;

app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.listen(port, () => {
  console.log(`App Listening at | http://localhost:${port}`);
});
