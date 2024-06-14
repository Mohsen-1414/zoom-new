import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Session from 'express-session';
import { createProxyMiddleware } from 'http-proxy-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Using of proxy
  app.use(
    '/api/zoomapp/proxy',
    createProxyMiddleware({
      target: process.env.REACT_APP_URI,
      changeOrigin: true,
    }),
  );

  // session config
  app.use(
    Session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  await app.listen(3001);
}
bootstrap();
