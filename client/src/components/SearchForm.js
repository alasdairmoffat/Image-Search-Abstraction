import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Input, Button } from 'reactstrap';

const SearchForm = props => {
  const { onSubmit, onChange } = props;

  return (
    <Form inline onSubmit={onSubmit}>
      <FormGroup>
        <Input
          type="search"
          name="search"
          id="search"
          placeholder="Image Search"
          onChange={onChange}
        />
      </FormGroup>
      <Button>Search</Button>
    </Form>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchForm;
