import { Schema, model } from 'mongoose';

const mostSharedLinksSchema = new Schema({
  _id: String,
  value: {
    name: String,
    count: Number,
  },
});

const MostSharedLinks = model('MostSharedLinks', mostSharedLinksSchema, 'mostSharedLinks');

export default MostSharedLinks;

export const GetMostLinkSharingUser = () => MostSharedLinks.find({}).sort({ 'value.count': -1 }).limit(5).exec();
