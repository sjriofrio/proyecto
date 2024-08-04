import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import formularioRouter from './routes/formulario.js';


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/formulario', formularioRouter);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

export default app;