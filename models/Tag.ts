import mongoose, { Schema, model } from 'mongoose';

const tagSchema = new Schema({
  label: { type: String, unique: true, required: true, lowercase: true },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Note',
  },
});

export const TagModel = mongoose.models.Tag || model('Tag', tagSchema);
