import { RequestLog } from '../model/RequestLog.js'; 

const logRequests = async (req, res, next) => {
  try {
    await RequestLog.create({
      method: req.method,
      url: req.originalUrl,
        timestamp: new Date(),
    });
  } catch (err) {
    console.error('Error logging request:', err);
  }
  next();
};
export { logRequests };
