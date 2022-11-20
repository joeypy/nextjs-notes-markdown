import { useRouter } from 'next/router';
import React from 'react';

const NoteByIdPage = () => {
  const router = useRouter();

  return <div>NoteByIdPage {router.query.id}</div>;
};

export default NoteByIdPage;
