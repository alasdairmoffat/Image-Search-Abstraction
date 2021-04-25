import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row, Button, Collapse, Table, Spinner, Col,
} from 'reactstrap';

import {
  updateInputText,
  updateSearchTerm,
  fetchImages,
} from '../store/actions/imagesActions';

const LatestSearches = () => {
  const searchHistory = useSelector(
    (state) => state.searchHistory.searchHistory,
  );

  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const onClick = async (searchTerm) => {
    dispatch(updateInputText(searchTerm));
    dispatch(updateSearchTerm(searchTerm));
    dispatch(fetchImages(searchTerm));
  };

  const collapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Row className="mb-3 justify-content-center">
        <Button onClick={collapse}>Recent Searches</Button>
      </Row>

      <Collapse isOpen={isOpen}>
        {searchHistory.length ? (
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
        ) : (
          <Col style={{ backgroundColor: '#eee' }}>
            <Spinner
              className="mt-4 mb-4"
              style={{ width: '3rem', height: '3rem' }}
            />
          </Col>
        )}
      </Collapse>
    </>
  );
};

export default LatestSearches;
