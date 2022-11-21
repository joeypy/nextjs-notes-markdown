import React, { useMemo } from 'react';
import { NewNote } from '../../components/NewNote';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { TRawNote, TNoteData, TTag } from '../../interfaces/notes.interfaces';
import { v4 as uuidV4 } from 'uuid';

const NewNotePage = () => {
  const [notes, setNotes] = useLocalStorage<TRawNote[]>('NOTES', []);
  const [tags, setTags] = useLocalStorage<TTag[]>('TAGS', []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: TNoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  const addTag = (tag: TTag) => {
    setTags((prev) => [...prev, tag]);
  };

  return (
    <div>
      <NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags}/>
    </div>
  );
};

export default NewNotePage;
