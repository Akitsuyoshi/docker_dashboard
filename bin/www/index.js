import cluster from 'cluster';
import CPUs from 'os';
import http from 'http';
import app from '../../src/server';

const port = process.env.PORT || 3000;
const numOfCPUs = CPUs.cpus().length;
const isProd = process.env.NODE_ENV === 'production';

if (cluster.isMaster && isProd) {
  for (let i = 0; i < numOfCPUs; i += 1) {
    // Create a worker
    cluster.fork();
  }
  let maxWorkerCrashes = numOfCPUs;
  cluster.on('exit', worker => {
    // Replace the dead worker,
    if (worker.suicide !== true) {
      maxWorkerCrashes--;
      if (maxWorkerCrashes <= 0) {
        console.error('Too many worker crashes');
        // kill the cluster, let supervisor restart it
        process.exit();
      } else {
        cluster.fork();
      }
    }
  });
} else {
  const server = http.createServer(app);
  server.listen(port);
}
