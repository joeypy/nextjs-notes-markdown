import { Row, Col, Stack, Badge, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Axios } from '../services/objectRequest';
import { PreviewMarkdown } from './PreviewMarkdown';


interface Props {
  data: any;
}

export const Note = ({ data }: Props) => {
  const router = useRouter();

  const onDelete = async () => {
    try {
      const resp = await Axios.delete(`/api/notes/?id=${data._id}`);
      if (resp.status === 200) {
        router.replace('..');
      }
    } catch (err: any) {
      console.error(Error(err));
    }
  };

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>{data?.title}</h1>
          {data?.tags?.length > 0 && (
            <Stack gap={1} direction="horizontal" className="flex-wrap">
              {data.tags.map((tag: any) => (
                <Badge className="text-truncate" key={tag._id}>
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link href={`/note/edit/${data?._id}`}>
              <Button variant="primary">Edit</Button>
            </Link>
            <Button
              onClick={() => {
                onDelete();
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

        <PreviewMarkdown markdownText={data?.markdown}/>
      </Row>
      
    </>
  );
};
