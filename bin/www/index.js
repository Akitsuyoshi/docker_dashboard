import cluster from 'cluster';
import CPUs from 'os';
import http from 'http';
import app from '../../src/server';
import CONFIG from '../../config';

const { port, env } = CONFIG;

if (cluster.isMaster && env === 'production') {
  const numOfCPUs = CPUs.cpus().length;
  numOfCPUs.forEach(() => cluster.fork());

  let maxWorkerCrashes = numOfCPUs;

  cluster.on('exit', worker => {
    // Replace the dead worker
    if (worker.suicide !== true) {
      maxWorkerCrashes--;
      if (maxWorkerCrashes <= 0) {
        console.error('Too many worker crashes');
        // kill the cluster, let supervisor restart it
        // TODO: it needs to investigate later about exit code number
        process.exit(1);
      } else {
        cluster.fork();
      }
    }
  });
} else {
  const server = http.createServer(app);
  server.listen(port);
}
