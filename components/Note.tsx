import React, { useMemo } from 'react';
import { Row, Col, Stack, Badge, Button } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { TTag } from '../interfaces/notes.interfaces';

interface Props {
  data: {
    tags: TTag[];
    id: string;
    title: string;
    markdown: string;
    tagIds: string[];
  };
}

export const Note = ({ data }: Props) => {
  const router = useRouter();

  // if (!data && process.browser) {
  //   router.push('/');
  // }

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{data?.title}</h1>
          {data?.tags.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {data.tags.map((tag) => (
                <Badge className="text-truncate" key={tag.id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link href={`/note/edit/${data?.id}`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                // onDelete(note.id);
                // navigate('/');
                console.log('delete');
              }}
              variant="outline-danger"
            >
              Delete
            </Button>
            <Link href="/">
              <Button variant="outline-secondary">Back</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
      <ReactMarkdown>{data?.markdown}</ReactMarkdown>
    </>
  );
};
