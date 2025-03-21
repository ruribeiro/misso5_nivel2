const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors'); // Importa a biblioteca CORS
const createError = require('http-errors'); // Importa para lidar com erros HTTP

// Importa os arquivos de rotas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const livroRouter = require('./routes/livros');

const app = express();

// Configuração do mecanismo de visualização
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(cors()); // Habilita CORS para permitir requisições de diferentes origens
app.use(logger('dev')); // Logger para requisições HTTP
app.use(express.json()); // Suporte para JSON no corpo das requisições
app.use(express.urlencoded({ extended: false })); // Suporte para dados codificados em URL
app.use(cookieParser()); // Analisa cookies
app.use(express.static(path.join(__dirname, 'public'))); // Define a pasta de arquivos estáticos

// Rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/livros', livroRouter);

// Tratamento de erro 404 (rota não encontrada)
app.use((req, res, next) => {
  next(createError(404));
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  // Define variáveis locais, fornecendo erro apenas no ambiente de desenvolvimento
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Renderiza a página de erro
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;