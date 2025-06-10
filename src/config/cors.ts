import { CorsOptions } from 'cors';

export const corsConfig: CorsOptions = {
  // origin: ['http://localhost:5173']
  origin: function(origin, callback) {
    const whiteList = [process.env.FRONTEND_URL]

    if(process.argv[2] === '--api') {
      whiteList.push(undefined);
    }
    
    if(whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS error'))
    }
  }
}