import parseErr from 'parse-error';

export const to = promise => promise.then(data => [null, data]).catch(err => [parseErr(err)]);

// Throw Error
export const TE = (err, log) => {
  if (log === true) console.error(err);
  throw new Error(err);
};

// Error web response => { success: false, error: errMsg }
export const ReE = (res, err, code) => {
  let sendData = { success: false };

  if (typeof err === 'object' && typeof err.message !== 'undefined') {
    sendData = Object.assign({ error: err.message }, sendData);
  }
  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json(sendData);
};

// Success web response => { success: true, dataObj }
export const ReS = (res, data, code) => {
  let sendData = { success: true };

  if (typeof data === 'object') {
    sendData = Object.assign(data, sendData);
  }
  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json(sendData);
};
