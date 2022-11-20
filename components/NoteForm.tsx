import React from 'react';
import { Col, Form, Row, Stack } from 'react-bootstrap';
import CreatableReactSelect from 'react-select/creatable';

interface Props {}

export const NoteForm = (props: Props) => {
  return (
    <Form>
      <Stack>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect isMulti />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="markdown">
              <Form.Label>Body</Form.Label>
              <Form.Control required as="textarea" />
            </Form.Group>
          </Col>
        </Row>
      </Stack>
    </Form>
  );
};
