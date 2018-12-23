// Models
import { models } from '../models';
import { to, TE, ReE, ReS } from '../../services/util';

// Create, Update
export const modelSync = async (req, res) => {
  const { id, modelName } = req.params;

  if (!models[modelName]) {
    TE('req must specify valid model', true);
    return ReE(res, `Failed to manipulate to model: ${modelName}, Please check name it again`);
  }

  const model = new models[modelName](req.body);
  if (id) model.id = id;

  const [err, result] = await to(model.save());
  if (err) {
    TE(`Failed to add or update model: ${model}`, true);
    return ReE(res, `Failed to update model: ${modelName}`);
  }

  return ReS(res, result);
};

// Read
export const modelList = async (req, res) => {
  const { id, modelName } = req.params;

  if (!models[modelName]) {
    TE('req must specify valid model', true);
    return ReE(res, `Failed to manipulate to model: ${modelName}, Please check name it again`);
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

  const [err, result] = await to(model.find(req.body));
  if (err) {
    TE(`Failed to get model: ${model}, criteria: ${req.body}`);
    return ReE(
      res,
      `failed to get users, which is like : ${req.body}, please validate specific info for getting ${model}`
    );
  }
  return ReS(res, result);
};
