import { NoteList } from '../components';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TTag } from '../interfaces/notes.interfaces';

export default function HomePage() {
  const [tags, setTags] = useLocalStorage<TTag[]>('TAGS', []);

  return (
    <div className="container">
      <NoteList availableTags={tags} />
    </div>
  );
}
