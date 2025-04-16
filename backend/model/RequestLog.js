import {Schema,model} from "mongoose"
const requestLogSchema = new Schema({
  method: String,
  url: String,
  
  timestamp: { type: Date, default: Date.now }
});

const RequestLog =model('RequestLog', requestLogSchema);
export { RequestLog };