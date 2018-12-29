/* eslint no-underscore-dangle: 0 */

// Models. like { User: User, someModel: someMode }
import express from 'express';
import { models } from './models';
import { to, TE, ReE, ReS } from '../services/util';

// Create, Update
export const modelSync = async (req, res) => {
  const { id, modelName } = req.params;

  if (!models[modelName]) {
    TE('req must specify valid model', true);
    return ReE(res, `Failed to get model: ${modelName}, Please check name it again`);
  }

  const model = new models[modelName](req.body);
  const modelId = { _id: null };
  if (id) modelId._id = id;

  const [err, result] = await to(model.save());
  if (err) {
    TE(`Failed to add or update model: ${model}`, true);
    return ReE(res, `Failed to update model: ${modelName}`);
  }

  return ReS(res, result);
};

// Read
export const objectList = async (req, res) => {
  const { id, modelName } = req.params;
  const criteria = req.body;

  if (!models[modelName]) {
    TE('req must specify valid model', true);
    return ReE(res, `Failed to read model: ${modelName}, Please check name it again`);
  }
  const model = models[modelName];

  if (id) {
    const [err, result] = await to(model.findById(id));
    if (err) {
      TE(`Failed to get model: ${model}, id: ${id}`);
      return ReE(res, `failed to get users id : ${id}, please check valid id`);
    }
    return ReS(res, result);
  }

  const [err, result] = await to(model.find(criteria));
  if (err) {
    TE(`Failed to get model: ${model}, criteria: ${criteria}`);
    return ReE(res, `failed to get users, which is : ${req.body}, please check your passed ${model} info`);
  }
  return ReS(res, result);
};

const router = express.Router();

export default router
  .get('/user/:id', objectList)
  .post('/user', modelSync)
  .put('/user/:id', modelSync);
