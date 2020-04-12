import { Schema, model } from 'mongoose';

const topSharedDomainsSchema = new Schema({
  _id: String,
  value: {
    name: String,
    count: Number,
  },
});

const TopSharedDomains = model('TopSharedDomains', topSharedDomainsSchema, 'topSharedDomains');

export default TopSharedDomains;

export const GetTopSharedDomains = () => TopSharedDomains.find({}).sort({ 'value.count': -1 }).limit(5).exec();
