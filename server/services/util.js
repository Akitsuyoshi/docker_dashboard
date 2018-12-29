import parseErr from 'parse-error';

export const to = promise => promise.then(data => [null, data]).catch(err => [parseErr(err)]);

// Throw Error
export const TE = (err, log) => {
  if (log === true) console.error(err);
  throw new Error(err);
};

// Error web response => { success: false, error: errMsg }
export const ReE = (res, errMsg, code = undefined) => {
  let sendData = { success: false };

  if (typeof errMsg === 'string') {
    sendData = Object.assign({ error: errMsg }, sendData);
  }
  if (typeof code === 'number') res.statusCode = code;

  return res.json(sendData);
};

// Success web response => { success: true, dataObj }
export const ReS = (res, data, code = undefined) => {
  let sendData = { success: true };

  if (typeof data === 'object') {
    sendData = Object.assign(data, sendData);
  }
  if (typeof code === 'number') res.statusCode = code;

  return res.json(sendData);
};
