import { Container, Row } from 'reactstrap';
import { useAppSelector } from '../../app/hooks';
import LatestSearches from './LatestSearches';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

const ImageSearch = () => {
  const { searchTerm } = useAppSelector((state) => state.images);

  return (
    <Container>
      <Row className="mt-4 mb-4 justify-content-center">
        <SearchForm />
      </Row>

      <LatestSearches />
      {searchTerm && <SearchResults />}
    </Container>
  );
};

export default ImageSearch;
