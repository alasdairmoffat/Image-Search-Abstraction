import { Col, Row, Spinner } from 'reactstrap';
import { useAppSelector } from '../../app/hooks';
import { useGetImagesQuery } from '../api/apiSlice';
import ImageModal from '../modal/ImageModal';
import ImageCard from './ImageCard';
import ImagesPagination from './ImagesPagination';

const SearchResults = () => {
  const { searchTerm, page } = useAppSelector((state) => state.images);

  const {
    data: imagesData,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetImagesQuery({
    searchTerm,
    page,
  });

  const Loading = () => (
    <Spinner
      color="light"
      className="mt-4"
      style={{ width: '5rem', height: '5rem' }}
    />
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isSuccess && (
            <>
              <ImageModal />

              <Row className="justify-content-center">
                <h4 className="text-light mb-4">
                  Showing results for &apos;
                  {searchTerm}
                  &apos;
                </h4>
              </Row>

              <Row className="justify-content-center">
                <ImagesPagination />
              </Row>

              {isFetching ? (
                <Loading />
              ) : (
                <Row className="justify-content-center">
                  {imagesData?.items.length && (
                    <>
                      {imagesData.items.map((image, i) => (
                        <Col
                          key={image.id}
                          xs="12"
                          sm="12"
                          md="6"
                          lg="6"
                          xl="4"
                        >
                          <ImageCard image={image} index={i} />
                        </Col>
                      ))}
                    </>
                  )}
                </Row>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default SearchResults;
