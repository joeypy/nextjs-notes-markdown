import React, { SetStateAction, useRef, useState } from 'react';
import { Modal, Button, Form, Stack, Row, Col } from 'react-bootstrap';
import { Axios } from '../services/objectRequest';
import { useRouter } from 'next/router';

interface Props {
  show: boolean;
  onHide: React.Dispatch<SetStateAction<boolean>>;
  tags: any;
}

export const EditTagModal = ({ show, onHide, tags }: Props) => {
  const router = useRouter();

  const updateTag = async (id: string, label: string) => {
    try {
      const data = await Axios.patch(`/api/tags/?id=${id}`, {
        label: label,
      });
      if (data.status == 200) {
        router.replace('/');
      }
    } catch (err: any) {
      console.error(Error(err));
    }
  };

  const deleteTag = async (id: string) => {
    try {
      const data = await Axios.delete(`/api/tags/?id=${id}`);
      if (data.status == 200) {
        router.replace('/');
      }
    } catch (err: any) {
      console.error(Error(err));
    }
  };

  return (
    <div>
      <Modal size="lg" show={show} onHide={() => onHide(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Stack gap={2}>
              {tags.map((tag: any) => (
                <StackItem
                  key={tag._id}
                  tag={tag}
                  updateTag={updateTag}
                  deleteTag={deleteTag}
                />
              ))}
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const StackItem = ({ tag, updateTag, deleteTag }: any) => {
  const [label, setLabel] = useState(tag.label);

  return (
    <>
      <Row key={tag._id}>
        <Col>
          <Form.Group controlId="title">
            <Form.Control
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Button
            variant="outline-success"
            onClick={() => updateTag(tag._id, label)}
          >
            &#10003;
          </Button>
        </Col>
        <Col xs="auto">
          <Button variant="outline-danger" onClick={() => deleteTag(tag._id)}>
            &times;
          </Button>
        </Col>
      </Row>
    </>
  );
};
