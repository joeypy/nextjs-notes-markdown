import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { Note } from '../../components';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TRawNote, TTag } from '../../interfaces/notes.interfaces';
import { db } from '../../database';
import { NoteModel } from '../../models';

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  let data = {};

  try {
    await db.connect();

    data = await NoteModel.findOne({ _id: id }).populate('tags').lean();

    await db.disconnect();
  } catch (err: any) {
    console.error(Error(err));
  }

  return {
    props: {
      note: JSON.stringify(data),
    },
  };
};

const NoteByIdPage = ({ note }: any) => {
  // const [notes] = useLocalStorage<TRawNote[]>('NOTES', []);
  // const [tags] = useLocalStorage<TTag[]>('TAGS', []);

  // const notesWithTags = useMemo(() => {
  //   return notes.map((note) => {
  //     return {
  //       ...note,
  //       tags: tags.filter((tag) => note.tagIds.includes(tag._id)),
  //     };
  //   });
  // }, [notes, tags]);

  // const note = notesWithTags.find((n) => n._id == _id);
  // if (note == null && process.browser) {
  //   router.push('/');
  // }

  return (
    <>
      <Note data={JSON.parse(note)} />
    </>
  );
};

export default NoteByIdPage;
