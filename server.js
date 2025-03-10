const express = require('express'); 
const path = require('path'); 
const app = express();
const PORT = 3000;

const logger = require('./middlewares/logger'); 
const errorHandler = require('./middlewares/errorHandler'); 

const morganMiddleware = require('./middlewares/morganMiddleware');
const corsMiddleware = require('./middlewares/corsMiddleware');
const helmetMiddleware = require('./middlewares/helmetMiddleware');
const limiter = require('./middlewares/rateLimitMiddleware');
const cookieParserMiddleware = require('./middlewares/cookieParserMiddleware');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(morganMiddleware);
app.use(corsMiddleware);
app.use(helmetMiddleware);
app.use(limiter);
app.use(cookieParserMiddleware);

app.use(express.static(path.join(__dirname, 'public')));

const apiRoutes = require('./api/apiRoutes');
app.use('/api', apiRoutes); 

const viewsPath = path.join(__dirname, 'views');
app.get('/', (req, res) => res.sendFile(path.join(viewsPath, 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(viewsPath, 'register.html')));
app.get('/index.html' , (req, res) => res.sendFile(path.join(viewsPath, 'index.html')));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
