import 'dotenv/config';
import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { createApp } from './src/server/createApp';

const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = createApp();

  // Mount Vite or static build
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n======================================================`);
    console.log(`🌿 HerbTrace Platform Live on http://localhost:${PORT}`);
    console.log(`   Role: Collector | Admin | Customer`);
    console.log(`   Demo Admin: admin@herbtrace.demo / HerbTrace@2026`);
    console.log(`   Demo Collector: collector@herbtrace.demo / HerbTrace@2026`);
    console.log(`   Demo Customer: customer@herbtrace.demo / HerbTrace@2026`);
    console.log(`======================================================\n`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting HerbTrace server:', err);
  process.exit(1);
});
