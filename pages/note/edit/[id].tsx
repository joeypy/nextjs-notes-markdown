import { db } from '../../../database';
import { GetServerSideProps } from 'next';
import { NoteModel, TagModel } from '../../../models';
import { Axios } from '../../../services/objectRequest';
import { NoteForm } from '../../../components';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  let data = {};
  let dataTags = {};

  try {
    await db.connect();

    data = await NoteModel.findOne({ _id: id }).populate('tags').lean();
    dataTags = await TagModel.find().lean().select('_id label');

    await db.disconnect();
  } catch (err: any) {
    console.error(Error(err));
  }

  return {
    props: {
      note: JSON.parse(JSON.stringify(data)),
      tags: JSON.parse(JSON.stringify(dataTags)),
    },
  };
};

const EditNotePage = ({ note, tags }: any) => {
  const onUpdateNote = async (data: any) => {
    try {
      await Axios.patch(`/api/notes/?id=${note._id}`, data);
    } catch (err: any) {
      console.error(Error(err));
    }
  };

  const addTag = async (label: string) => {
    try {
      const { data } = await Axios.post('/api/tags', { label });
      return data.tag;
    } catch (err: any) {
      console.error(Error(err));
    }
  };

  return (
    <div>
      <h1 className="mb-4">Edit note</h1>
      <NoteForm
        onSubmit={onUpdateNote}
        onAddTag={addTag}
        availableTags={tags}
        note={note}
      />
    </div>
  );
};

export default EditNotePage;
