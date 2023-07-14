/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { Server } from 'http';

process.on('uncaughtException', error => {
  console.error('❌ Uncaught Exception');
  console.error(error);
  process.exit(1);
});

let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.databaseURL as string);
    console.info('🛢 Connected to Database');
    server = app.listen(config.port, () => {
      console.info('🚀 Server started on port ' + config.port);
    });
  } catch (error) {
    console.error('❌ Failed to connect to Database');
  }

  process.on('unhandledRejection', error => {
    console.log('unhandled Rejection detected, we are closing our server...');
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });

  // process.on('unhandledRejection', (error) => {
  //   errorLogger.error('❌ Unhandled Rejection')
  //   process.exit(1)
  // })
}

bootstrap();

//Sigterm signal
process.on('SIGTERM', () => {
  console.info('SIGTERM signal received: closing HTTP server');
  if (server) {
    server.close();
  }
});
