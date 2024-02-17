import 'dotenv/config';
import ExpressServer from './server/expressServer.js';

const server = new ExpressServer();
server.listen();
