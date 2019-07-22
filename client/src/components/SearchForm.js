import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from 'reactstrap';

const SearchForm = props => {
  const { onSubmit, onChange } = props;

  return (
    <Form onSubmit={onSubmit} style={{ width: '80%' }}>
      <FormGroup>
        <InputGroup>
          <Input
            type="search"
            name="search"
            id="search"
            placeholder="Image Search"
            onChange={onChange}
          />
          <InputGroupAddon addonType="append">
            <Button>Search</Button>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
    </Form>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchForm;
