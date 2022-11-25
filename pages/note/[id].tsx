import { GetServerSideProps } from 'next';
import { Note } from '../../components';
import { db } from '../../database';
import { NoteModel } from '../../models';

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
      note: JSON.parse(JSON.stringify(data)),
    },
  };
};

const NoteByIdPage = ({ note }: any) => {

  return (
    <>
      <Note data={note} />
    </>
  );
};

export default NoteByIdPage;
