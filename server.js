const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001;
const BUILD_DIR = path.join(__dirname, 'build');
const INDEX_FILE = path.join(BUILD_DIR, 'index.html');

const createHttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const normalizeErrorStatus = (status) => {
  if (status === 403 || status === 404) {
    return status;
  }
  return 500;
};

// Serve static files from the React app build directory
app.use(express.static(BUILD_DIR));

// Explicit handlers to force custom status flows when needed.
app.get('/error/403', (req, res, next) => {
  next(createHttpError(403, 'Forbidden'));
});

app.get('/error/404', (req, res, next) => {
  next(createHttpError(404, 'Not Found'));
});

app.get('/error/500', (req, res, next) => {
  next(createHttpError(500, 'Internal Server Error'));
});

// SPA fallback: serve index.html for any unknown route
app.get('*', (req, res) => {
  res.sendFile(INDEX_FILE);
});

// Error handler for dashboard server routes.
app.use((err, req, res, next) => {
  const status = normalizeErrorStatus(err.status || 500);

  if (res.headersSent) {
    return next(err);
  }

  return res.redirect(`/${status}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});
