import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row, Button, Collapse, Table,
} from 'reactstrap';

import {
  updateInputText,
  updateSearchTerm,
  fetchImages,
} from '../store/actions/imagesActions';

const LatestSearches = () => {
  const searchHistory = useSelector((state) => state.searchHistory.searchHistory);

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
        <Table
          hover
          style={{
            backgroundColor: '#eee',
            cursor: 'pointer',
          }}
        >
          <tbody>
            {searchHistory.map((search, i) => (
              <tr
                key={`latest${i}`}
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
      </Collapse>
    </>
  );
};

export default LatestSearches;
