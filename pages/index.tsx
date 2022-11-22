import { useState } from 'react';
import { EditTagModal, NoteList } from '../components';
import { db } from '../database';
import { NoteModel, TagModel } from '../models';
import Link from 'next/link';

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next';
import { Button, Col, Row, Stack } from 'react-bootstrap';

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
      notes: JSON.parse(JSON.stringify(dataNotes)),
      tags: JSON.parse(JSON.stringify(dataTags)),
    },
  };
};

export default function HomePage({ notes, tags }: any) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="container">
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link href="/note/new">
              <Button variant="primary">Create</Button>
            </Link>
            <Button
              variant="outline-secondary"
              onClick={() => setModalShow(true)}
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <EditTagModal
        show={modalShow}
        onHide={setModalShow}
        tags={tags}
      />
      <NoteList notes={notes} tags={tags} />
    </div>
  );
}
