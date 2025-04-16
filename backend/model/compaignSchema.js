import {Schema,model} from "mongoose"
const compaignSchema=new Schema({
name: {type: String, },
  description: {type: String },
  status: { type: String, enum: ['active', 'inactive', 'deleted'], default: 'active' },
  leads: [String],
  accountIDs: [String],
}, { timestamps: true }
)
const Compaign=model("Compaign",compaignSchema)
export { Compaign}