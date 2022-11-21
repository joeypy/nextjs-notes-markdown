import { NoteModel } from '../models';

let NoteController = {
  find: async () => {
    try {
      return await NoteModel.find();
    } catch (err: any) {
      console.error(Error(err));
    }
  },
};
