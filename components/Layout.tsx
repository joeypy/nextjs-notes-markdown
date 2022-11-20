import { Container } from 'react-bootstrap';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return <Container className="my-4">{children}</Container>;
};
