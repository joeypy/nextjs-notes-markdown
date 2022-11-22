import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Row, Col, Stack, Button, Form } from 'react-bootstrap';
import ReactSelect from 'react-select';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { TRawNote, TTag } from '../interfaces/notes.interfaces';
import { NoteCard } from './';

interface Props {
  tags: any;
  notes: any;
}

export const NoteList = ({ notes, tags }: Props) => {
  const [selectedTags, setSelectedTags] = useState<TTag[]>([]);
  const [title, setTitle] = useState('');

  const filterNotes = useMemo(() => {
    return notes.filter((note: any) => {
      return (
        (title === '' ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag: any) => noteTag._id === tag._id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag._id,
                }))}
                options={tags.map((tag: any) => {
                  return { label: tag.label, value: tag._id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => ({ label: tag.label, _id: tag.value }))
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} className="g-3">
        {filterNotes.map((note: any) => (
          <Col key={note._id}>
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>
    </>
  );
};
