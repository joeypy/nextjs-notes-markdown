import React, { useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { NewNote } from '../../components/NewNote';
import { TRawNote, TNoteData, TTag } from '../../interfaces/notes.interfaces';
import { db } from '../../database';
import { NoteModel, TagModel } from '../../models';
import { NoteForm } from '../../components';
import { Axios } from '../../services/objectRequest';

interface Props {
  onSubmit: (data: TNoteData) => void;
  onAddTag: (label: string) => any;
  availableTags: TTag[];
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let dataNotes: any = [];
  let dataTags: any = [];

  try {
    await db.connect();

    dataNotes = await NoteModel.find().populate('tags').lean();
    dataTags = await TagModel.find().lean().select('_id label');

    await db.disconnect();
  } catch (err: any) {
    console.error(Error(err));
  }

  return {
    props: {
      notes: JSON.stringify(dataNotes),
      tags: JSON.stringify(dataTags),
    },
  };
};

const NewNotePage = ({ notes, tags }: any) => {
  const onCreateNote = async (data: any) => {
    try {
      await Axios.post('/api/notes', { ...data });
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
      <h1 className="mb-4">New note</h1>
      <NoteForm
        onSubmit={onCreateNote}
        onAddTag={addTag}
        availableTags={JSON.parse(tags)}
      />
    </div>
  );
};

export default NewNotePage;
