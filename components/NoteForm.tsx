import React, { useRef, useState } from 'react';
import { Button, Col, Form, Row, Stack } from 'react-bootstrap';
import Link from 'next/link';
import CreatableReactSelect from 'react-select/creatable';
import { TNoteData, TTag } from '../interfaces/notes.interfaces';
import { useRouter } from 'next/router';

interface IProps {
  onSubmit: (data: any) => void;
  onAddTag: (label: string) => any;
  availableTags: TTag[];
}

export const NoteForm = ({ onSubmit, onAddTag, availableTags }: IProps) => {
  const [newTags, setNewTags] = useState(availableTags);
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<TTag[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags.map((tag) => tag._id),
    });
    router.replace('..');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                className="text-capitalize"
                isMulti
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag._id,
                }))}
                onCreateOption={async (label) => {
                  let newTag = await onAddTag(label);
                  setSelectedTags((prev) => [...prev, newTag]);
                  setNewTags((prev) => [...prev, newTag]);
                }}
                options={newTags.map((tag) => {
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

        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control required as="textarea" ref={markdownRef} rows={15} />
        </Form.Group>

        <Stack gap={2} direction="horizontal" className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link href="..">
            <Button type="button" variant="outline-secondary">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};
