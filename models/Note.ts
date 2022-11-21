import mongoose, { Schema, model } from 'mongoose';

const noteSchema = new Schema({
  title: { type: String, unique: true, required: true },
  markdown: { type: String, required: true },
  tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag', required: false }],
});

export const NoteModel = mongoose.models.Note || model('Note', noteSchema);
