import React from 'react';
import { Badge, Card, Stack } from 'react-bootstrap';
import { TNote } from '../interfaces/notes.interfaces';
import Link from 'next/link';
import styles from '../styles/card.module.css';

interface Props {
  note: TNote;
}

export const NoteCard = ({ note: { id, title, tags } }: Props) => {
  return (
    <Card
      as={Link}
      href={`note/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          <span>{title}</span>
          {!!tags.length && (
            <Stack
              direction="horizontal"
              gap={1}
              className="justify-content-center flex-wrap"
            >
              {tags.map((tag) => (
                <Badge key={tag.id}>{tag.label}</Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};
