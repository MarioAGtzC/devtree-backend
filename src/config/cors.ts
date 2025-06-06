import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  // origin: ['http://localhost:5173']
  origin: function(origin, callback) {
    if(origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('CORS error'))
    }
  }
}