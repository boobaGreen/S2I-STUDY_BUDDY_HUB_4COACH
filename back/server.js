const mongoose = require('mongoose');
const http = require('http');

const dotenv = require('dotenv');
const { app } = require('./app');
const { initializeSocket } = require('./socketManager');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

async function dbConnect() {
  try {
    await mongoose.connect(DB);
    console.log('Connected to the database!');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
}
dbConnect();

const port = process.env.PORT || 5000;

const server = http.createServer(app);

// Applica il middleware CORS prima di definire le route
// app.use(cors());

initializeSocket(server);

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Gestisce le promesse non gestite
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥', err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Gestisce eccezioni non gestite
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥', err.name, err.message, err.stack);
  server.close(() => {
    process.exit(1);
  });
});

// Gestisce chiusura del processo
process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = { app, server };
