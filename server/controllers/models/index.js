/* eslint global-require: 0, import/no-dynamic-require: 0 */
import fs from 'fs';
import mongoose from 'mongoose';
import { basename } from 'upath';
import CONFIG from '../../../config';

if (!CONFIG.db_host || !CONFIG.db_port || !CONFIG.db_name) {
  console.log('No mongo credentials given');
}

const models = {};

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.' !== 0) && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const fileName = file.split('.')[0];
    const modelName = fileName.charAt(0).toUpperCase() + fileName.slice(1);
    models[modelName] = require(`./${file}`);
  });

mongoose.Promise = global.Promise;

const mongoLocation = `mongodb://${CONFIG.db_host}:${CONFIG.db_port}/${CONFIG.db_name}`;
mongoose.connect(mongoLocation).catch(() => console.log('*** Can Not Connect to Mongo Server:', mongoLocation));

const db = mongoose.connection;
db.once('open', () => console.log(`Connected to mongo at ${mongoLocation}`));
db.on('error', err => console.log('err', err));

export { db, models };
