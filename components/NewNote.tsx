import React from 'react';
import { TNoteData, TTag } from '../interfaces/notes.interfaces';
import { NoteForm } from './NoteForm';

interface Props {
  onSubmit: (data: TNoteData) => void;
  onAddTag: (label: string) => any;
  availableTags: TTag[];
}

export const NewNote = ({ onSubmit, availableTags, onAddTag }: Props) => {
  return (
    <div>
      <h1 className="mb-4">New note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </div>
  );
};
