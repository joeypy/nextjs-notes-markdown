import React from 'react';
import { NoteForm } from './NoteForm';

interface Props {}

export const NewNote = (props: Props) => {
  return (
    <div>
      <h1 className="mb-4">New note</h1>
      <NoteForm />
    </div>
  );
};
