import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Row, Button, Collapse, Table } from 'reactstrap';

const LatestSearches = ({ onClick }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const formatTime = timeString => {
    const time = Math.floor((Date.now() - new Date(timeString)) / 1000);

    if (Math.floor(time / (60 * 60 * 24 * 7))) {
      const weeks = Math.floor(time / (60 * 60 * 24 * 7));
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
    if (Math.floor(time / (60 * 60 * 24))) {
      const days = Math.floor(time / (60 * 60 * 24));
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    if (Math.floor(time / (60 * 60))) {
      const hours = Math.floor(time / (60 * 60));
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    if (Math.floor(time / 60)) {
      const mins = Math.floor(time / 60);
      return `${mins} min${mins > 1 ? 's' : ''} ago`;
    }
    return '<1 min ago';
  };

  // the api call to fetch the most recent search data will be made whenever the ImageSearch component re-renders
  useEffect(() => {
    const getLatest = async () => {
      const latest = await axios.get('/api/latest/imagesearch');
      const newSearchHistory = latest.data.map(x => ({
        searchTerm: x.searchTerm,
        timeSince: formatTime(x.date),
      }));
      setSearchHistory(newSearchHistory);
    };
    getLatest();
  }, [onClick]);

  const collapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Fragment>
      <Row className="mb-3 justify-content-center">
        <Button onClick={collapse}>Recent Searches</Button>
      </Row>

      <Collapse isOpen={isOpen}>
        <Table hover style={{ backgroundColor: '#eee', cursor: 'pointer' }}>
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
                <td style={{ fontSize: '0.8rem', color: '#222' }}>
                  {search.timeSince}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Collapse>
    </Fragment>
  );
};

LatestSearches.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LatestSearches;
