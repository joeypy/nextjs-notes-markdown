import { useRouter } from 'next/router';
import React from 'react';

const EditNotePage = () => {
  const router = useRouter();

  return <div>EditNotePage {router.query.id}</div>;
};

export default EditNotePage;