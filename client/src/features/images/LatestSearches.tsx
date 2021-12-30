import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Collapse, Row, Spinner, Table } from 'reactstrap';
import {
  useAddSearchHistoryMutation,
  useGetSearchHistoryQuery,
} from '../api/apiSlice';
import { updateSearchTerm } from './imagesSlice';

const LatestSearches = () => {
  const dispatch = useDispatch();
  const [addHistory] = useAddSearchHistoryMutation();

  const { data: searchHistory = [], isFetching } = useGetSearchHistoryQuery();

  const [isOpen, setIsOpen] = useState(false);

  const onClick = (searchTerm: string) => {
    addHistory({ searchTerm });
    dispatch(updateSearchTerm(searchTerm));
  };

  const collapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Row className="mb-3 justify-content-center">
        <Col>
          <Button onClick={collapse}>Recent Searches</Button>
        </Col>
      </Row>

      <Collapse isOpen={isOpen}>
        {isFetching ? (
          <Col style={{ backgroundColor: '#eee' }}>
            <Spinner
              className="mt-4 mb-4"
              style={{ width: '3rem', height: '3rem' }}
            />
          </Col>
        ) : (
          <Table
            hover
            style={{
              backgroundColor: '#eee',
              cursor: 'pointer',
            }}
          >
            <tbody>
              {searchHistory.map((search) => (
                <tr
                  key={`latest${search.id}`}
                  onClick={() => {
                    collapse();
                    onClick(search.searchTerm);
                  }}
                >
                  <td>{search.searchTerm}</td>
                  <td
                    style={{
                      fontSize: '0.8rem',
                      color: '#222',
                    }}
                  >
                    {search.timeSince}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Collapse>
    </>
  );
};

export default LatestSearches;
