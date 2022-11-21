import { NoteList } from '../components';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TTag } from '../interfaces/notes.interfaces';
import { db } from '../database';
import { NoteModel, TagModel } from '../models';

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let dataNotes: any = [];
  let dataTags: any = [];

  try {
    await db.connect();

    dataNotes = await NoteModel.find().populate('tags').lean();
    dataTags = await TagModel.find().lean();

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

export default function HomePage({ notes, tags }: any) {
  // console.log('index', notes, tags);
  // const [tags, setTags] = useLocalStorage<TTag[]>('TAGS', []);

  return (
    <div className="container">
      <NoteList notes={JSON.parse(notes)} tags={JSON.parse(tags)} />
    </div>
  );
}
